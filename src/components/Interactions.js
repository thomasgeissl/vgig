import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { Sampler, Channel, Volume, Destination } from "tone";

import Context from "../Context";

import Sample1 from "../assets/interactions/1.mp3";
import Sample2 from "../assets/interactions/2.mp3";
import Sample3 from "../assets/interactions/3.mp3";
import Sample4 from "../assets/interactions/4.mp3";
import Sample5 from "../assets/interactions/5.mp3";
import Sample6 from "../assets/interactions/6.mp3";
import Sample7 from "../assets/interactions/7.mp3";
import Sample8 from "../assets/interactions/8.mp3";
import EnterSample from "../assets/enter.mp3";

import { NAME } from "../constants";
import { useClient } from "../mqttConnection";

import { setCurrentAction } from "../store/reducers/users";
import { addToHistory } from "../store/reducers/console";

import Button from "./Button";
import Section from "./Section";
import config from "../config/config.json";

const actions = config.actions;

const samples = [
  Sample1,
  Sample2,
  Sample3,
  Sample4,
  Sample5,
  Sample6,
  Sample7,
  Sample8,
];

const Container = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
`;

const channel = new Channel(-32);
const volumeNode = new Volume(0);
channel.connect(volumeNode);
volumeNode.connect(Destination);

export default () => {
  const [context] = useContext(Context);
  const { subscribe, publish } = useClient();
  const [channel, setChannel] = useState(null);
  const [sfx, setSfx] = useState(null);
  const [enter, setEnter] = useState(null);
  const [leave, setLeave] = useState(null);

  const dispatch = useDispatch();
  const volume = useSelector((state) => state.mixer.volumeInteractions);
  if (channel) {
    // volumeNode.volume.value = volume
    channel.volume.value = volume;
  }

  useEffect(() => {
    const channel = new Channel(-32);
    channel.connect(Destination);
    const instruments = [];
    samples.forEach((sample, index) => {
      instruments.push(new Sampler({ C3: sample }));
      instruments[index].attack = 0;
      instruments[index].release = 1.3;
      instruments[index].connect(channel);
    });
    setChannel(channel);
    setSfx(instruments);

    const enter = new Sampler({ C3: EnterSample });
    enter.connect(channel);
    setEnter(enter);

    const leave = new Sampler({ C3: EnterSample });
    leave.connect(channel);
    setLeave(leave);
  }, []);

  useEffect(() => {
    if (!context.hallId || !enter || !leave || !sfx) return;
    subscribe(`${NAME}/${context.hallId}/enter`, (topic, message) => {
      enter.triggerAttackRelease("C3", 20);
      dispatch(addToHistory(message.userId, "entered."));
    });
    subscribe(`${NAME}/${context.hallId}/leave`, (topic, message) => {
      leave.triggerAttackRelease("C3", 20);
      dispatch(addToHistory(message.userId, "left."));
    });
    actions.forEach((action, index) => {
      subscribe(`${NAME}/${context.hallId}/${action.id}`, (topic, message) => {
        sfx[index].triggerAttackRelease(
          40 + Math.round(Math.random() * 60),
          20
        );
        dispatch(addToHistory(message.userId, action.logText));
        dispatch(setCurrentAction(message.userId, action.id));
      });
    });
  }, [context.hallId, dispatch, enter, leave, sfx, subscribe]);

  return (
    <Container>
      <Section title={"actions"} color={"rgb(46, 94, 160)"}>
        <Grid container>
          {actions.map((action, index) => {
            return (
              <Grid item xs={3} key={index}>
                <Button
                  key={action.id}
                  variant="outlined"
                  color="primary"
                  borderColor={action.color}
                  onClick={() => {
                    publish(`${NAME}/${context.hallId}/${action.id}`, {
                      userId: context.userId,
                    });
                  }}
                  label={action.label}
                ></Button>
              </Grid>
            );
          })}
        </Grid>
      </Section>
    </Container>
  );
};
