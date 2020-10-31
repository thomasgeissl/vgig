import React, { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
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
export default () => {
  const { id } = useParams();
  const [context, setContext] = useContext(Context);
  const { publish, subscribe } = useClient();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setContext({ ...context, hallId: id });
    publish(`${NAME}/${id}/enterLobby`, {
      userId: context.userId,
    });
    subscribe(`${NAME}/${id}/setUserName`, (topic, message) => {
      dispatch(setName(message.id, message.name));
    });
    // publish(`${NAME}/${id}/getUsers`, { from: context.userId });
    // setInterval(() => {
    //   publish(`${NAME}/${id}/alive`, { userId: context.userId });
    // }, 30 * 1000);hallId
  }, [id]);

  return (
    <Container>
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
      {/* {!open && ( */}
      <>
        <Orchestra className="orchestra" id={id}></Orchestra>
        <Audience className="audience" id={id}></Audience>
        <Interactions className="interactions" id={id}></Interactions>
        <Mixer></Mixer>
      </>
      {/* )} */}
    </Container>
  );
};
