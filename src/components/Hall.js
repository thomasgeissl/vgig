import React, { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Toolbar from "@material-ui/core/Toolbar";
import ForumIcon from "@material-ui/icons/Forum";
import styled from "styled-components";

import Audience from "./Audience";
import Lobby from "./Lobby";
import Orchestra from "./Orchestra";
import Interactions from "./Interactions";
import Mixer from "./Mixer";

import Context from "../Context";
import { NAME } from "../constants";
import { useClient } from "../mqttConnection";

import { setName } from "../store/reducers/users";
import { addMessage } from "../store/reducers/chat";

import Chat from "./Chat";

import { addUser, setUsers, heartBeat } from "../store/reducers/users";
import store from "../store";
import config from "../config/config.json";
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
const Desk = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: black;
`;

const StyledModal = styled(Modal)`
  width: 100%;
  height: 100%;
`;
const ModalContent = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledChat = styled(Chat)`
  position: absolute;
  right: 0;
  top: 0;
  width: 33vw;
`;
export default () => {
  const { id } = useParams();
  const [context, setContext] = useContext(Context);
  const { publish, subscribe } = useClient();
  const dispatch = useDispatch();
  const [subscribed, setSubscribed] = useState(false);
  const [open, setOpen] = useState(true);
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    if (context.hallId === id) return;
    console.log("storing hall id in context");
    setContext({ ...context, hallId: id });
  }, [id, context, setContext]);

  useEffect(() => {
    if (subscribed) return;
    setSubscribed(true);
    console.log("subscribing to hall topics");

    subscribe(`${NAME}/${id}/audience/getUsers`, (topic, message) => {
      console.log(topic, message);
    });
    subscribe(`${NAME}/${id}/audience/getUsers`, (topic, message) => {
      console.log(`${message.from} requested to get users`);
      if (message.from && message.from !== context.userId) {
        console.log(`${message.from} requested to get users`);
        publish(
          `${NAME}/${id}/audience/setUsers`,
          store.getState().users.users
        );
      }
    });
    subscribe(`${NAME}/${id}/audience/setUsers`, (topic, message) => {
      dispatch(setUsers(message));
    });
    subscribe(`${NAME}/${id}/audience/enterLobby`, (topic, message) => {
      dispatch(addUser(message.userId, "anonymous "));
    });

    subscribe(`${NAME}/${id}/audience/alive`, (topic, message) => {
      dispatch(heartBeat(message.userId));
    });

    subscribe(`${NAME}/${id}/audience/setUserName`, (topic, message) => {
      dispatch(setName(message.id, message.name));
    });
    subscribe(`${NAME}/${id}/audience/chat`, (topic, message) => {
      dispatch(addMessage(message.user, message.message));
    });

    publish(`${NAME}/${id}/audience/getUsers`, { from: context.userId });
    publish(`${NAME}/${id}/audience/enterLobby`, {
      userId: context.userId,
    });
    setInterval(() => {
      publish(`${NAME}/${id}/audience/alive`, { userId: context.userId });
    }, 30 * 1000);
  }, [id, subscribed, subscribe, publish, setSubscribed, dispatch, context]);

  return (
    <Container>
      {(config.chat || config.console) && (
        <AppBar position="sticky" style={{ backgroundColor: "transparent" }}>
          <Toolbar>
            <IconButton
              color="primary"
              onClick={(event) => {
                setShowConsole(!showConsole);
              }}
            >
              <ForumIcon></ForumIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <StyledModal open={open}>
        <ModalContent>
          <Lobby
            onEnter={(name) => {
              publish(`${NAME}/${context.hallId}/audience/enter`, {
                userId: context.userId,
                name,
              });
              setOpen(false);
            }}
          ></Lobby>
        </ModalContent>
      </StyledModal>
      <>
        <Orchestra id={id}></Orchestra>
        <Desk>
          <Audience id={id}></Audience>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Interactions id={id}></Interactions>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Mixer></Mixer>
            </Grid>
          </Grid>
        </Desk>
        {showConsole && (
          <StyledChat
            onClose={() => {
              setShowConsole(false);
            }}
          ></StyledChat>
        )}
      </>
    </Container>
  );
};
