import React, { useState, useEffect, useMemo, useRef} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components"
import { Freeverb, PingPongDelay, Master, Sampler } from "tone";
import client from "../mqtt"
import {status as statusTypes} from "../midi"
import A from "../assets/A.mp3"
import Violin_C3 from "../assets/violin_c3.mp3"


import * as THREE from 'three'
import { OrbitControls } from 'drei'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame, useThree } from 'react-three-fiber'

const samples = {
    C3: A
}

const violinSamples = {
    C3: Violin_C3
}

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


export default () => {
  const [percussion, setPercussion] = useState(null);
  const [violin, setViolin] = useState(null);

  useEffect(() => {
    const percussion = new Sampler(samples);
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
    reverb.connect(Master);
    setPercussion(percussion);

    const violin = new Sampler(violinSamples)
    violin.volume.value = 0
    violin.connect(Master)
    setViolin(violin)
  }, []);

  useEffect(() => {
    // TODO: only fire once
    client.on('message', function (topic, message) {
      const {channel, note, velocity, status} = JSON.parse(message.toString())
      if(status != statusTypes.noteOn) return
      switch(channel){
        case 1: {
          if(percussion) percussion.triggerAttackRelease(note)
          break;
        }
        case 2: {
          if(violin) violin.triggerAttackRelease(note)
          break;
        }
      }
    })
    client.subscribe("vgig/midi")
  }, [percussion, violin], ()=> {
      client.unsubscribe("vgig/midi")
  });

//   useEffect(() => {
//     if (instrument) {
//       if (note) {
//         // TODO: check why this is not working
//         // instrument.triggerAttack(note, 0, velocity);
//         instrument.triggerAttack(note, undefined, velocity);
//       } else {
//         instrument.triggerRelease();
//       }
//     }
//   }, [instrument, note, velocity]);

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
