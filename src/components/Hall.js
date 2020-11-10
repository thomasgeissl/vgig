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

const Container = styled.div`
  width: 100%;
  height: 100%;
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
    publish(`${NAME}/${id}/audience/enterLobby`, {
      userId: context.userId,
    });
    subscribe(`${NAME}/${id}/audience/setUserName`, (topic, message) => {
      dispatch(setName(message.id, message.name));
    });
    subscribe(`${NAME}/${id}/audience/chat`, (topic, message) => {
      dispatch(addMessage(message.user, message.message));
    });
  }, [id, subscribed, subscribe, publish, setSubscribed, dispatch, context]);

  return (
    <Container>
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
        <Audience id={id}></Audience>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Interactions id={id}></Interactions>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Mixer></Mixer>
          </Grid>
        </Grid>
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
