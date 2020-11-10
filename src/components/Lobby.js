import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import { useClient } from "../mqttConnection";
import { NAME } from "../constants";
import Context from "../Context";

const Container = styled.div``;
const Actions = styled.section`
  margin-top: 24px !important;
  display: flex;
  flex-direction: row-reverse;
`;
const EnterButton = styled(Button)``;

export default ({ onEnter }) => {
  const { publish } = useClient();
  const [name, setName] = useState("");
  const [context] = useContext(Context);
  return (
    <Container>
      <div>
        hello, <br></br>please enter your name and enjoy the show.
      </div>
      <TextField
        fullWidth
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
            onEnter(name);
          }
        }}
      ></TextField>
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
            onEnter(name);
          }}
        >
          enter
        </EnterButton>
      </Actions>
    </Container>
  );
};
