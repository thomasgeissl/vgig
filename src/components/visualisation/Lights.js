import React from "react";

export default () => {
  return (
    <>
      <ambientLight intensity={0.4}></ambientLight>
      <pointLight position={[-10, -5, 5]} intensity={0.4}></pointLight>
      <pointLight position={[7, -3, 5]} intensity={0.4}></pointLight>
    </>
  );
};
