import React from "react";
import * as THREE from "three";
import { extend, Canvas, useFrame } from "react-three-fiber";

export default () => {
  return (
    <>
      <mesh rotation={[-Math.PI / 3, 0, 0]} position={[0, -5, 0]}>
        {/* <mesh> */}
        <planeBufferGeometry
          attach="geometry"
          args={[100, 100]}
        ></planeBufferGeometry>
        <meshStandardMaterial
          attach="material"
          color="rgb(64,32,32)"
        ></meshStandardMaterial>
      </mesh>
    </>
  );
};
