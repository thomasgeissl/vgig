import React from "react";

export default () => {
  return (
    <>
      <ambientLight intensity={1}></ambientLight>
      <pointLight position={[-10, -10, 5]} intensity={13.6}></pointLight>
      <pointLight position={[7, -15, 5]} intensity={12.8}></pointLight>
    </>
  );
};
