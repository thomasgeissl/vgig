import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import { useClient } from "../mqttConnection";
import { NAME } from "../constants";
import Context from "../Context";
import { start } from "tone";

const Container = styled.div``;
const Actions = styled.section`
  margin-top: 24px !important;
  display: flex;
  flex-direction: row-reverse;
`;

const Hello = styled.div`
  margin-bottom: 24px;
`;
const EnterButton = styled(Button)``;
const StyledTextField = styled(TextField)`
  .MuiInput-input {
    color: white;
  }
  .MuiInputBase-input {
    background-color: rgb(24, 24, 24);
  }
`;

export default ({ onEnter }) => {
  const { publish } = useClient();
  const [name, setName] = useState("");
  const [context] = useContext(Context);
  return (
    <Container>
      <Hello>
        hello, <br></br>please enter your name and enjoy the show.
      </Hello>
      <StyledTextField
        fullWidth
        autoFocus
        color="primary"
        label="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter" && name !== "") {
            publish(`${NAME}/${context.hallId}/audience/setUserName`, {
              id: context.userId,
              name,
            });
            setName("");
            start();
            onEnter(name);
          }
        }}
      ></StyledTextField>
      <br></br>

      <Actions>
        <EnterButton
          color="primary"
          variant="outlined"
          onClick={() => {
            if (name === "") return;
            publish(`${NAME}/${context.hallId}/audience/setUserName`, {
              id: context.userId,
              name,
            });
            setName("");
            start();
            onEnter(name);
          }}
        >
          enter
        </EnterButton>
      </Actions>
    </Container>
  );
};
