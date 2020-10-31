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

import Console from "./Console";
import Chat from "./Chat";

const Container = styled.div`
  width: 100%;
  height: 100%;
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
const panels = { CHAT: "CHAT", CONSOLE: "CONSOLE" };
export default () => {
  const { id } = useParams();
  const [context, setContext] = useContext(Context);
  const { publish, subscribe } = useClient();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    setContext({ ...context, hallId: id });
    publish(`${NAME}/${id}/enterLobby`, {
      userId: context.userId,
    });
    subscribe(`${NAME}/${id}/setUserName`, (topic, message) => {
      dispatch(setName(message.id, message.name));
    });
    subscribe(`${NAME}/${id}/chat`, (topic, message) => {
      dispatch(addMessage(message.user, message.message));
    });
    // publish(`${NAME}/${id}/getUsers`, { from: context.userId });
    // setInterval(() => {
    //   publish(`${NAME}/${id}/alive`, { userId: context.userId });
    // }, 30 * 1000);hallId
  }, [id]);

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
              publish(`${NAME}/${context.hallId}/enter`, {
                userId: context.userId,
                name,
              });
              setOpen(false);
            }}
          ></Lobby>
        </ModalContent>
      </StyledModal>
      <>
        <Orchestra className="orchestra" id={id}></Orchestra>
        <Audience className="audience" id={id}></Audience>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Interactions className="interactions" id={id}></Interactions>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Mixer></Mixer>
          </Grid>
        </Grid>
        {showConsole && <StyledChat></StyledChat>}
      </>
    </Container>
  );
};
