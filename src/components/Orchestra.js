import React, { useState, useEffect, useMemo, useRef} from "react";
import styled from "styled-components"
import { Analyser, Freeverb, PingPongDelay, Destination, Sampler, FMSynth, MetalSynth, NoiseSynth, Channel} from "tone";
import {status as statusTypes} from "../midi"
import A from "../assets/A.mp3"
import Violin_C3 from "../assets/violin_c3.mp3"


import * as THREE from 'three'
import { OrbitControls } from 'drei'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame } from 'react-three-fiber'
import { useClient } from "../mqttConnection"

import {NAME} from  "../constants"

const Container = styled.div`
  width: 100%;
  height: 66%;
`


extend(meshline)

function Fatline({ curve, width, color, speed }) {
  const material = useRef()
  useFrame(() => (material.current.uniforms.dashOffset.value -= speed))
  return (
    <mesh>
      <meshLine attach="geometry" vertices={curve} />
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.9}
      />
    </mesh>
  )
}

function Lines({ count, colors }) {
  const lines = useMemo(
    () =>
      new Array(count).fill().map(() => {
        const pos = new THREE.Vector3(10 - Math.random() * 20, 10 - Math.random() * 20, 10 - Math.random() * 20)
        const points = new Array(30)
          .fill()
          .map(() =>
            pos.add(new THREE.Vector3(4 - Math.random() * 8, 4 - Math.random() * 8, 2 - Math.random() * 4)).clone()
          )
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000)
        return {
          color: colors[parseInt(colors.length * Math.random())],
          width: Math.max(0.1, 0.65 * Math.random()),
          speed: Math.max(0.0001, 0.0005 * Math.random()),
          curve,
        }
      }),
    [colors, count]
  )
  return lines.map((props, index) => <Fatline key={index} {...props} />)
}


export default ({id}) => {
  const [channel, setChannel] = useState(null);
  const [analyzer, setAnalyzer] = useState(null);
  const [percussion, setPercussion] = useState(null);
  const [violin, setViolin] = useState(null);
  const [bass, setBass] = useState(null);
  const [metal, setMetal] = useState(null);
  const [noise, setNoise] = useState(null);

  const { subscribe, unsubscribe } = useClient()

  useEffect(() => {
    const channel = new Channel()
    channel.connect(Destination)
    setChannel(channel)

    const analyzer = new Analyser()
    channel.connect(analyzer)
    setAnalyzer(analyzer)

    const percussion = new Sampler({C3: A});
    percussion.volume.value = -6;
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
    setPercussion(percussion);

    const violin = new Sampler({C3: Violin_C3})
    violin.volume.value = 0
    violin.connect(channel)
    setViolin(violin)

    const bass = new FMSynth(
      {
        "volume": 0,
        "detune": 0,
        "portamento": 0,
        "harmonicity": 3,
        "oscillator": {
          "partialCount": 0,
          "partials": [],
          "phase": 0,
          "type": "sine"
        },
        "envelope": {
          "attack": 0.01,
          "attackCurve": "linear",
          "decay": 0.2,
          "decayCurve": "exponential",
          "release": 0.5,
          "releaseCurve": "exponential",
          "sustain": 1
        },
        "modulation": {
          "partialCount": 0,
          "partials": [],
          "phase": 0,
          "type": "square"
        },
        "modulationEnvelope": {
          "attack": 0.2,
          "attackCurve": "linear",
          "decay": 0.01,
          "decayCurve": "exponential",
          "release": 0.5,
          "releaseCurve": "exponential",
          "sustain": 1
        },
        "modulationIndex": 12.22
      }
    )
    bass.connect(channel)
    setBass(bass)


    const metal = new MetalSynth( {
      frequency : 200 ,
      envelope : {
      attack : 0.001 ,
      decay : 1.4 ,
      release : 0.2
      }
      ,
      harmonicity : 5.1 ,
      modulationIndex : 32 ,
      resonance : 4000 ,
      octaves : 1.5
      }
    )
    metal.connect(channel)
    setMetal(metal)

    const noise = new NoiseSynth()
    noise.connect(channel)
    setNoise(noise)
  }, []);

  
  useEffect(() => {
    subscribe( `${NAME}/${id}/orchestra`, (topic, message) => {
      console.log(message)
      const {channel, note, status} = message
      // if(status !== statusTypes.noteOn && status !== statusTypes.noteOff) return
      switch(channel){
        case 1: {
          if(percussion) percussion.triggerAttackRelease(note)
          break;
        }
        case 2: {
          if(violin) violin.triggerAttackRelease(note)
          break;
        }
        case 3: {
          if(bass && status === statusTypes.noteOn) bass.triggerAttack(note)
          if(bass && status === statusTypes.noteOff) bass.triggerRelease(note)
          break;
        }
        case 4: {
          if(metal && status === statusTypes.noteOn) metal.triggerAttack(note)
          if(metal && status === statusTypes.noteOff) metal.triggerRelease(note)
          break;
        }
        case 5: {
          if(noise && status === statusTypes.noteOn) noise.triggerAttack()
          if(noise && status === statusTypes.noteOff) noise.triggerRelease()
          break;
        }
        default : {
          break;
        }
      }
    })
  }, [percussion, violin, id], ()=> {
      unsubscribe(`${NAME}/${id}/orchestra`)
  });

  // console.log(analyzer ? analyzer.getValue() : "")
  return (
    <Container>
      <Canvas
      style={{ background: 'rgb(0,0,0)' }}
      camera={{ position: [0, 0, 10], fov: 25 }}
    >
      <Lines count={20} colors={['rgb(100,0,0)', '#222', '#aaa', '#e0feff', 'rgb(100,0,60)', 'rgb(127,32,64)']} />
      <OrbitControls></OrbitControls>
    </Canvas>
    </Container>
  );
};
