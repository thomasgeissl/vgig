import React from "react";

export default () => {
  return (
    <>
      <mesh rotation={[-Math.PI / 3, 0, 0]} position={[0, 0, 0]}>
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
