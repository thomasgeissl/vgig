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
    const particleRefs = Array(1024).fill(createRef());
    // particleRefs.forEach((particleRef, index)=>{
    //   particleRefs[index]

    // })
    // particleRefs.map((_, i) => createRef());
    // console.log(particleRefs);

    const particles = [...Array(1024)].map((item, index) => {
      const x = (index / 1024) * 600 - 300; // -halfWidth
      return (
        <Particle
          key={index}
          position={[x, 0, 5]}
          ref={particleRefs[index]}
        ></Particle>
      );
    });

    setParticleRefs(particleRefs);
    setParticles(particles);
  }, []);

  useFrame(() => {
    const values = analyser.getValue();
    if (testTextRef.current) {
      let sum = 0;
      values.forEach((value) => (sum += value));
      testTextRef.current.scale.x = sum / 1024;
    }
    // console.log(particleRefs[0].current);
    particleRefs.forEach((ref, index) => {
      if (ref) {
        // console.log("update particle", ref, index);
        // ref.current.scale.y = values[index] * 1000;
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
