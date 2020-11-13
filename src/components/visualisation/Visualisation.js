import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Text } from "@react-three/drei/Text";

import Floor from "./Floor";
import Stage from "./Stage";

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

export default ({ analyser }) => {
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
      <Stage></Stage>

      <mesh>
        <bufferGeometry></bufferGeometry>
      </mesh>
    </>
  );
};
