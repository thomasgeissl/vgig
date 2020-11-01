import React, { useState, useEffect, useMemo, useRef } from "react";
import { Provider as StoreProvider } from "react-redux";
import styled from "styled-components";
import {
  Analyser,
  Freeverb,
  PingPongDelay,
  Destination,
  Sampler,
  FMSynth,
  MetalSynth,
  NoiseSynth,
  Channel,
} from "tone";
import { status as statusTypes } from "../midi";
import UnaCorda_C3 from "../assets/unacorda_C3.mp3";
import JarbleAmbiencePad_C3 from "../assets/jarbleambiencepad_C3.mp3";

import Visualisation from "./Visualisation";
import Lights from "./visualisation/Lights";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "drei";

import { useClient } from "../mqttConnection";

import { NAME } from "../constants";

import PostProcessing from "./visualisation/PostProcessing";
import store from "../store";

const Container = styled.div`
  width: 100%;
  height: 66.66%;
`;

export default ({ id }) => {
  const [channel, setChannel] = useState(null);
  const [analyzer, setAnalyzer] = useState(null);
  const [unaCorda, setUnaCorda] = useState(null);
  const [violin, setViolin] = useState(null);
  const [bass, setBass] = useState(null);
  const [metal, setMetal] = useState(null);
  const [noise, setNoise] = useState(null);
  const [fftValues, setFftValues] = useState([]);

  const { subscribe, unsubscribe } = useClient();

  useEffect(() => {
    const channel = new Channel();
    channel.connect(Destination);
    setChannel(channel);

    const analyzer = new Analyser();
    channel.connect(analyzer);
    setAnalyzer(analyzer);
    setInterval(() => {
      if (analyzer) {
        setFftValues(analyzer.getValue());
      }
    }, 50);

    const percussion = new Sampler({ C3: UnaCorda_C3 });
    const reverb = new Freeverb(0.6, 5000);
    const pingPongDelay = new PingPongDelay({
      delayTime: "32n",
      feedback: 0.7,
      wet: 0.25,
    });
    percussion.volume.value = 0;
    percussion.connect(pingPongDelay);
    pingPongDelay.connect(reverb);
    reverb.connect(channel);
    setUnaCorda(percussion);

    const violin = new Sampler({ C3: JarbleAmbiencePad_C3 });
    violin.volume.value = 0;
    violin.connect(channel);
    setViolin(violin);

    const bass = new FMSynth({
      volume: 0,
      detune: 0,
      portamento: 0,
      harmonicity: 3,
      oscillator: {
        partialCount: 0,
        partials: [],
        phase: 0,
        type: "sine",
      },
      envelope: {
        attack: 0.01,
        attackCurve: "linear",
        decay: 0.2,
        decayCurve: "exponential",
        release: 0.5,
        releaseCurve: "exponential",
        sustain: 1,
      },
      modulation: {
        partialCount: 0,
        partials: [],
        phase: 0,
        type: "square",
      },
      modulationEnvelope: {
        attack: 0.2,
        attackCurve: "linear",
        decay: 0.01,
        decayCurve: "exponential",
        release: 0.5,
        releaseCurve: "exponential",
        sustain: 1,
      },
      modulationIndex: 12.22,
    });
    bass.connect(channel);
    setBass(bass);

    const metal = new MetalSynth({
      frequency: 200,
      envelope: {
        attack: 0.001,
        decay: 1.4,
        release: 0.2,
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5,
    });
    metal.connect(channel);
    setMetal(metal);

    const noise = new NoiseSynth();
    noise.connect(channel);
    setNoise(noise);
  }, []);

  useEffect(
    () => {
      subscribe(`${NAME}/${id}/orchestra`, (topic, message) => {
        const { channel, note, status } = message;
        // if(status !== statusTypes.noteOn && status !== statusTypes.noteOff) return
        switch (channel) {
          case 1: {
            if (unaCorda) unaCorda.triggerAttackRelease(note);
            break;
          }
          case 2: {
            if (violin) violin.triggerAttackRelease(note);
            break;
          }
          case 3: {
            if (bass && status === statusTypes.noteOn) bass.triggerAttack(note);
            if (bass && status === statusTypes.noteOff)
              bass.triggerRelease(note);
            break;
          }
          case 4: {
            if (metal && status === statusTypes.noteOn)
              metal.triggerAttack(note);
            if (metal && status === statusTypes.noteOff)
              metal.triggerRelease(note);
            break;
          }
          case 5: {
            if (noise && status === statusTypes.noteOn) noise.triggerAttack();
            if (noise && status === statusTypes.noteOff) noise.triggerRelease();
            break;
          }
          default: {
            break;
          }
        }
      });
    },
    [unaCorda, violin, id],
    () => {
      unsubscribe(`${NAME}/${id}/orchestra`);
    }
  );

  // console.log(analyzer ? analyzer.getValue() : "")
  return (
    <Container>
      <Canvas
        style={{ background: "rgb(0,0,0)" }}
        camera={{ position: [0, 0, 10], fov: 45 }}
        colorManagement
      >
        <OrbitControls></OrbitControls>
        <Lights></Lights>

        <Visualisation analyzer={analyzer}></Visualisation>
        <StoreProvider store={store}>
          <PostProcessing></PostProcessing>
        </StoreProvider>
      </Canvas>
    </Container>
  );
};
