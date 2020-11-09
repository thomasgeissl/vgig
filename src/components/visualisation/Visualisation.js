import React, { useState, useEffect, useRef, createRef } from "react";
import { useFrame } from "react-three-fiber";
import { Text } from "@react-three/drei/Text";

import Floor from "./Floor";
import Stage from "./Stage";

const Particle = ({ position }) => {
  const mesh = useRef(null);
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    // console.log("new frame", analyzer.getValue())
  });
  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry
        attach="geometry"
        args={[0.01, 0.01, 0.01]}
      ></boxBufferGeometry>
      <meshStandardMaterial
        attach="material"
        color="lightblue"
      ></meshStandardMaterial>
    </mesh>
  );
};

export default ({ analyser }) => {
  const testTextRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [particleRefs, setParticleRefs] = useState([]);
  useEffect(() => {
    const particleRefs = (particleRefs) =>
      Array(1024)
        .fill()
        .map((_, i) => particleRefs[i] || createRef());
    setParticleRefs(particleRefs);

    const particles = [...Array(1024)].map((item, index) => (
      <Particle
        key={index}
        position={[index / 50, 0, 5]}
        ref={particleRefs[index]}
      ></Particle>
    ));
    setParticles(particles);
  }, []);

  useFrame(() => {
    const values = analyser.getValue();
    if (testTextRef.current) {
      let sum = 0;
      values.forEach((value) => (sum += value));
      testTextRef.current.scale.x = sum / 1024;
    }
    particleRefs.forEach((ref, index) => {
      // console.log("update ref", ref, index);
      if (ref && ref.current) {
        ref.current.scale.y = values[index] * 100;
      }
    });
  });

  return (
    <>
      <Text
        ref={testTextRef}
        color="white" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        here will be an audio visualisation
      </Text>

      <Text
        color="purple" // default
        anchorX="center" // default
        anchorY="center" // default
        position={[-20, 2, 0]}
      >
        WSTG
      </Text>
      {particles.map((cube) => {
        return cube;
      })}

      <Floor></Floor>
      <Stage></Stage>
      {/* <Particle position={[-2, 0, 0]}></Particle>
      <Particle position={[-1, 2, 0]}></Particle>
      <Particle position={[2, 3, 0]}></Particle> */}
      <mesh>
        <bufferGeometry></bufferGeometry>
      </mesh>

      {/* <Lines count={fftValues.length} colors={['rgb(100,0,0)', '#222', '#aaa', '#e0feff', 'rgb(100,0,60)', 'rgb(127,32,64)']} /> */}
      {
        // fftValues.forEach((value, index) => {
        //     console.log(value, index)
        // })
      }
    </>
  );
};
