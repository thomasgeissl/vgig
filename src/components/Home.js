import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {context} from "tone";
import styled from "styled-components";

import pc from "../../package.json";
const version = pc.version;

const Container = styled.div`
  max-width: 768px;
  margin: auto;
  margin-top: 100px;
`;
const Version = styled.div`
  position: fixed;
  padding: 25px;
  top: 0;
  right: 0%;
`;
const Intro = styled.section``;
const RoomChooser = styled.section`
  p {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;
const Door = styled.div`
  margin-top: 92px;
  text-align: center;
`;
const generateId = (length) => {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export default () => {
  const [room, setRoom] = useState(generateId(4));
  const history = useHistory();
  return (
    <Container>
      <Version>{version}</Version>
      <Intro>
        Welcome to vgig,<br></br>the virtual concert hall for everyone.
      </Intro>
      <RoomChooser>
        <p>
        </p>
        <Door>
          <TextField
            value={room}
            onChange={(event) => setRoom(event.target.value)}
          ></TextField>
          <Button
            onClick={() => {
              if (context.state !== "running") {
                context.resume();
              }
              history.push(`/halls/${room}`);
            }}
          >
            enter
          </Button>
        </Door>
      </RoomChooser>
    </Container>
  );
};