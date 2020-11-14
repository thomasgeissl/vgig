import React from "react";
import { usePlane } from "@react-three/cannon";

export default (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  // return (
  //   <>
  //     <mesh rotation={[-Math.PI / 3, 0, 0]} position={[0, 0, 0]}>
  //       {/* <mesh> */}
  //       <planeBufferGeometry
  //         attach="geometry"
  //         args={[100, 100]}
  //       ></planeBufferGeometry>
  //       <meshStandardMaterial
  //         attach="material"
  //         color="rgb(64,32,32)"
  //       ></meshStandardMaterial>
  //     </mesh>
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[10000, 10000]} />
      {/* <meshStandardMaterial
        attach="material"
        color="rgb(64,32,32)"
      ></meshStandardMaterial> */}
      <shadowMaterial attach="material" color="#171717" />
    </mesh>
  );
};
