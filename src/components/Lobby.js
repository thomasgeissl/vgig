import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import { useClient } from "../mqttConnection";
import { NAME } from "../constants";
import Context from "../Context";

const Container = styled.div``;

export default ({ onEnter }) => {
  const { subscribe, publish, getClient } = useClient();
  const [name, setName] = useState("");
  const [context] = useContext(Context);
  return (
    <Container>
      <div>hello, please enter your name and enjoy the show.</div>
      <TextField
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            publish(`${NAME}/${context.hallId}/setUserName`, {
              id: context.userId,
              name,
            });
            setName("");
            onEnter(name);
          }
        }}
      ></TextField>
      <Button
        onClick={() => {
          publish(`${NAME}/${context.hallId}/setUserName`, {
            id: context.userId,
            name,
          });
          setName("");
          onEnter(name);
        }}
      >
        enter
      </Button>
    </Container>
  );
};
