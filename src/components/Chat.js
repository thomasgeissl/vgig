import React, { useState, useContext } from "react";
import Context from "../Context";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { useClient } from "../mqttConnection";

import Section from "./Section";

const Container = styled.div`
  width: 33vw;
  @media only screen and (max-width: 600px) {
    width: 100vw;
  }

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

export default ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [showChatMessages, setShowChatMessages] = useState(true);
  const [showSystemMessages, setShowSystemMessages] = useState(false);
  const history = useSelector((state) => state.console.history);
  const messages = useSelector((state) => state.chat.messages);

  const allMessages = [...history, ...messages].sort((x, y) => x.time < y.time);
  const [context] = useContext(Context);
  const users = useSelector((state) => state.users.users);
  const { publish } = useClient();

  const List = styled.ul`
    list-style-type: none;
  `;

  const ChatMessage = styled.li``;
  const SystemMessage = styled.li`
    font-style: italic;
    text-align: right;
  `;

  return (
    <Container>
      <Section
        title={"chat/console"}
        color={"rgb(46, 94, 160)"}
        onClose={onClose}
      >
        <FormControlLabel
          control={
            <Switch
              checked={showChatMessages}
              onChange={(event) => {
                setShowChatMessages(event.target.checked);
              }}
              color="primary"
            />
          }
          label="chat messages"
        />

        <FormControlLabel
          control={
            <Switch
              checked={showSystemMessages}
              onChange={(event) => {
                setShowSystemMessages(event.target.checked);
              }}
              color="primary"
            />
          }
          label="system messages"
        />

        <List>
          {allMessages.map((message, index) => {
            let name;
            users.forEach((user) => {
              if (user.id === message.user) name = user.name;
            });
            return (
              <>
                {message.type === "CHAT" && showChatMessages && (
                  <ChatMessage key={index}>
                    {name}: {message.text}
                  </ChatMessage>
                )}
                {message.type === "SYSTEM" && showSystemMessages && (
                  <SystemMessage key={index}>
                    {context.hallId}: {name} {message.text}
                  </SystemMessage>
                )}
              </>
            );
          })}
        </List>
        <Input>
          <Grid
            container
            //   spacing={2}
          >
            <Grid item xs={9}>
              <TextField
                fullWidth
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    publish(`vgig/${context.hallId}/chat`, {
                      user: context.userId,
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
                // variant="outlined"
                fullWidth
                onClick={(event) => {
                  if (message !== "") {
                    publish(`vgig/${context.hallId}/chat`, {
                      user: context.userId,
                      message: message,
                    });
                  }
                  setMessage("");
                }}
              >
                <SendIcon></SendIcon>
              </Button>
            </Grid>
          </Grid>
        </Input>
      </Section>
    </Container>
  );
};
