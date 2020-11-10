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

const particles = [...Array(1024)];

export default ({ analyser }) => {
  const testTextRef = useRef(null);

  const particleRefs = useRef([]);
  particleRefs.current = [];

  const addToRefs = (el) => {
    if (el && !particleRefs.current.includes(el)) {
      particleRefs.current.push(el);
    }
  };
  // particleRefs.current = [...Array(1024)].map(
  //   (ref, index) => (particleRefs.current[index] = createRef())
  // );

  useFrame(() => {
    const values = analyser.getValue();
    if (testTextRef.current) {
      let sum = 0;
      values.forEach((value) => (sum += value));
      testTextRef.current.scale.x = sum / 1024;
    }
    // console.log(particleRefs.current[0]);
    particleRefs.current.forEach((ref, index) => {
      if (ref) {
        // console.log("update particle", ref, index);
        ref.scale.y = values[index] * 0.005;
      }
    });
  });

  // const addToRefs = (el) => {
  //   console.log("add to refs", el);
  // };

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
      {/* {particles.map((item, index) => {
        console.log("test");

        );
      })} */}

      {particles.map((item, index) => {
        const width = 50;
        const x = (index / 1024) * width - width / 2;
        return (
          <Text
            key={index}
            ref={addToRefs}
            color="white" // default
            anchorX="center" // default
            anchorY="middle" // default
            position={[x, 0, 0]}
            fontSize={2}
          >
            wstg
          </Text>
          // <Particle
          //   key={index}
          //   position={[x, 0, 5]}
          //   ref={(el) => {
          //     console.log(el);
          //   }}
          // ></Particle>
        );
      })}

      <Floor></Floor>
      <Stage></Stage>

      <mesh>
        <bufferGeometry></bufferGeometry>
      </mesh>
    </>
  );
};
