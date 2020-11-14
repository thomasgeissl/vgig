import React, { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "react-three-fiber";
import { Text } from "@react-three/drei/Text";

import Floor from "./Floor";
import Stage from "./Stage";
import Terrain from "./Terrain";

import config from "../../config/config";

// const Particle = ({ position }) => {
//   const mesh = useRef(null);
//   useFrame(() => {
//     mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
//     // console.log("new frame", analyzer.getValue())
//   });
//   return (
//     <mesh position={position} ref={mesh}>
//       <boxBufferGeometry
//         attach="geometry"
//         args={[0.01, 0.01, 0.01]}
//       ></boxBufferGeometry>
//       <meshStandardMaterial
//         attach="material"
//         color="lightblue"
//       ></meshStandardMaterial>
//     </mesh>
//   );
// };

const particles = [...Array(1024)];

export default ({ analyser, mood }) => {
  const seed = 1;
  const size = 170;
  const height = 0.6;
  const scale = 10;
  const levels = 10;

  let max = 0;
  let maxKey;
  mood.forEach((value, key) => {
    if (key && key !== "") {
      max = Math.max(value, max);
      if (max === value) {
        maxKey = key;
      }
    }
  });
  console.log(maxKey);
  let color = "white";
  if (maxKey && maxKey !== "") {
    config.actions.forEach((action) => {
      if (action.id === maxKey) {
        color = action.color;
      }
    });
  }
  // const color =

  const testTextRef = useRef(null);

  const particleRefs = useRef([]);
  particleRefs.current = [];

  const addToRefs = (el) => {
    if (el && !particleRefs.current.includes(el)) {
      particleRefs.current.push(el);
    }
  };

  useFrame(() => {
    const values = analyser.getValue();
    if (testTextRef.current) {
      let sum = 0;
      values.forEach((value) => (sum += value));
      testTextRef.current.scale.x = sum / 1024;
    }
    particleRefs.current.forEach((ref, index) => {
      if (ref) {
        // console.log(values[index]);
        // if (values[index] > 0) {
        // console.log("scale band");
        ref.scale.x = values[index] * 0.05;
        // }
      }
    });
  });

  // const addToRefs = (el) => {
  //   console.log("add to refs", el);
  // };

  function Thing({ vertices, color }) {
    return (
      <group ref={(ref) => console.log("we have access to the instance")}>
        <line>
          <geometry
            name="geometry"
            vertices={vertices.map((v) => new Vector3(...v))}
            onUpdate={(self) => (self.verticesNeedUpdate = true)}
          />
          <lineBasicMaterial name="material" color="white" />
        </line>
        {/* <mesh
          onClick={(e) => console.log("click")}
          onHover={(e) => console.log("hover")}
          onUnhover={(e) => console.log("unhover")}
        >
          <octahedronGeometry name="geometry" />
          <meshBasicMaterial
            name="material"
            color="peachpuff"
            opacity={0.5}
            transparent
          />
        </mesh> */}
      </group>
    );
  }

  return (
    <>
      <Text
        color="purple" // default
        anchorX="center" // default
        anchorY="center" // default
        position={[-20, 2, 0]}
      >
        WSTG
      </Text>

      {particles.map((item, index) => {
        const width = 40;
        // const x = (index / 1024) * width - width / 2;
        const r = 30;
        const theta = (index / particles.length) * Math.PI * 2;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        const y = 2;
        const position = [x, y, z];
        return (
          <mesh key={index} position={position} ref={addToRefs}>
            <boxBufferGeometry
              attach="geometry"
              args={[0.01, 0.01, 0.01]}
            ></boxBufferGeometry>
            <meshStandardMaterial
              attach="material"
              color="lightblue"
            ></meshStandardMaterial>
          </mesh>
          // <Text
          //   key={index}
          //   color="#101010" // default
          //   anchorX="center" // default
          //   anchorY="middle" // default
          //   position={[x, y, z]}
          //   fontSize={2}
          // >
          //   wstg
          // </Text>
          // <Particle
          //   key={index}
          //   position={[x, 0, 5]}
          //   ref={(el) => {
          //     console.log(el);
          //   }}
          // ></Particle>
        );
      })}

      <Floor position={[0, 0, 0]}></Floor>
      <Terrain
        seed={seed}
        size={Math.floor(size)}
        height={height}
        levels={Math.floor(levels)}
        scale={scale}
        color={color}
      ></Terrain>
    </>
  );
};
