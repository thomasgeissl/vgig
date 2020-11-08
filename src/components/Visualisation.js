import React, { useState, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import * as meshline from "threejs-meshline";
import { extend, Canvas, useFrame } from "react-three-fiber";
import { Text } from "@react-three/drei/Text";

import Floor from "./visualisation/Floor";
import Test from "./visualisation/test";

extend(meshline);

const Particle = ({ position }) => {
  const mesh = useRef(null);
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    // console.log("new frame", analyzer.getValue())
  });
  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}></boxBufferGeometry>
      <meshStandardMaterial
        attach="material"
        color="blue"
      ></meshStandardMaterial>
    </mesh>
  );
};

export default ({ analyzer }) => {
  return (
    <>
      <Text
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

      <Floor></Floor>
      {/* <Particle position={[-2, 0, 0]}></Particle>
      <Particle position={[-1, 2, 0]}></Particle>
      <Particle position={[2, 3, 0]}></Particle> */}
      <mesh>
        <bufferGeometry></bufferGeometry>
      </mesh>
      <Test></Test>

      {/* <Lines count={fftValues.length} colors={['rgb(100,0,0)', '#222', '#aaa', '#e0feff', 'rgb(100,0,60)', 'rgb(127,32,64)']} /> */}
      {
        // fftValues.forEach((value, index) => {
        //     console.log(value, index)
        // })
      }
    </>
  );
};
