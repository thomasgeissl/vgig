import React, { useState, useEffect } from "react";
import { Provider as StoreProvider, useSelector } from "react-redux";
import styled from "styled-components";
import { Analyser, Destination, Sampler, Channel, now, Gain } from "tone";
import { status as statusTypes } from "../midi";
import Visualisation from "./visualisation/Visualisation";
import Lights from "./visualisation/Lights";
import { Canvas } from "react-three-fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "drei";
import { useClient } from "../mqttConnection";

import PostProcessing from "./visualisation/PostProcessing";
import { NAME } from "../constants";
import store from "../store";

import Sample1 from "../assets/instruments/1.mp3";
import Sample2 from "../assets/instruments/2.mp3";
import Sample3 from "../assets/instruments/3.mp3";
import Sample4 from "../assets/instruments/4.mp3";
import Sample5 from "../assets/instruments/5.mp3";
import Sample6 from "../assets/instruments/6.mp3";
import Sample7 from "../assets/instruments/7.mp3";
import Sample8 from "../assets/instruments/8.mp3";
import Sample9 from "../assets/instruments/9.mp3";
import Sample10 from "../assets/instruments/10.mp3";
import Sample11 from "../assets/instruments/11.mp3";
import Sample12 from "../assets/instruments/12.mp3";
import Sample13 from "../assets/instruments/13.mp3";
import Sample14 from "../assets/instruments/14.mp3";
import Sample15 from "../assets/instruments/15.mp3";
import Sample16 from "../assets/instruments/16.mp3";

const samples = [
  Sample1,
  Sample2,
  Sample3,
  Sample4,
  Sample5,
  Sample6,
  Sample7,
  Sample8,
  Sample9,
  Sample10,
  Sample11,
  Sample12,
  Sample13,
  Sample14,
  Sample15,
  Sample16,
];

const Container = styled.div`
  width: 100%;
  height: 66.66%;
`;

export default ({ id }) => {
  const [channel, setChannel] = useState(null);
  const [instruments, setInstruments] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  const { subscribe } = useClient();
  const volume = useSelector((state) => state.mixer.volumeStage);
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
      instruments[index].sustain = 1;
      instruments[index].release = 1.3;
      instruments[index].connect(channel);
    });
    setChannel(channel);
    setInstruments(instruments);

    const analyser = new Analyser("fft", 1024);
    channel.connect(analyser);
    setAnalyser(analyser);
  }, []);

  useEffect(() => {
    if (!id || !instruments || subscribed) return;
    console.log("subscribing to orchestra topics");
    setSubscribed(true);
    subscribe(`${NAME}/${id}/orchestra`, (topic, message) => {
      const { channel, note, status, velocity } = message;
      if (channel && channel > 0 && channel <= 16) {
        if (status === statusTypes.noteOn) {
          instruments[channel - 1].triggerAttack(note, now(), velocity / 127);
        }
        if (status === statusTypes.noteOff) {
          instruments[channel - 1].triggerRelease(note, now());
        }
      }
    });
  }, [instruments, subscribed, id, subscribe]);

  // useFrame((state) => {
  //   console.log("frame", state);
  //   // console.log(analyser.getValue());
  // });
  return (
    <Container>
      <Canvas
        style={{ background: "rgb(0,0,0)" }}
        camera={{ position: [0, 0, 20], fov: 45, far: 30 }}
        colorManagement
      >
        <OrbitControls></OrbitControls>
        <Lights></Lights>
        <Physics>
          <Visualisation analyser={analyser}></Visualisation>
          <StoreProvider store={store}>
            <PostProcessing></PostProcessing>
          </StoreProvider>
        </Physics>
      </Canvas>
    </Container>
  );
};
