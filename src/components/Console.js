import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { compareAsc, format } from "date-fns";

import Section from "./Section";

const Container = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
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
  const history = useSelector((state) => state.console.history);
  const users = useSelector((state) => state.users.users);
  return (
    <Container>
      <Section title={"console"} color={"rgb(46, 94, 160)"}>
        <List>
          {history.map((item, index) => {
            let name;
            users.forEach((user) => {
              if (user.id === item.user) name = user.name;
            });
            return (
              <li key={index}>
                <Time>{format(item.time, "HH:mm:ss")}</Time>:{" "}
                <User>{name}</User> {item.text}
              </li>
            );
          })}
        </List>
      </Section>
    </Container>
  );
};
