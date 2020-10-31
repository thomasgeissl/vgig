import React, { useState, useEffect, useContext } from "react";
import Context from "../Context";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { compareAsc, format } from "date-fns";
import { useClient } from "../mqttConnection";

import { addMessage } from "../store/reducers/chat";
import Section from "./Section";

const Container = styled.div`
  width: 33vw;
  height: 50vh;
  position: absolute;
  top: 0;
  right: 0;
  flex-grow: 1;
  overflow-y: scroll;
  background-color: white;
  color: black;
  z-index: 1101;
`;

const Input = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Time = styled.span`
  font-style: italic;
  color: #333;
`;
const User = styled.span`
  font-weight: bold;
  color: #333;
`;
const List = styled.ul`
  list-style-type: none;
`;

export default () => {
  const [message, setMessage] = useState("");
  const history = useSelector((state) => state.console.history);
  const [context] = useContext(Context);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const users = useSelector((state) => state.users.users);
  const { subscribe, publish, getClient } = useClient();
  useEffect(() => {
    if (context.userId && context.hallId) {
      subscribe(`vgig/${context.hallId}/chat`, (topic, message) => {
        dispatch(addMessage(message.sender, message.message));
      });
    }
  }, [context]);
  return (
    <Container>
      <Section title={"chat/console"} color={"rgb(46, 94, 160)"}>
        <ul>
          {messages.map((message, index) => {
            let name;
            users.forEach((user) => {
              if (user.id === message.sender) name = user.name;
            });
            return (
              <li key={index}>
                {name}: {message.text}
              </li>
            );
          })}
        </ul>
        <Input>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                fullWidth
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    publish(`vgig/${context.hallId}/chat`, {
                      sender: context.userId,
                      message: message,
                    });
                    setMessage("");
                  }
                }}
              ></TextField>
            </Grid>
            <Grid item xs={3}>
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                onClick={(event) => {
                  if (message !== "") {
                    publish(`vgig/${context.hallId}/chat`, {
                      sender: context.userId,
                      message: message,
                    });
                  }
                  setMessage("");
                }}
              >
                send
              </Button>
            </Grid>
          </Grid>
        </Input>
      </Section>
    </Container>
  );
};
