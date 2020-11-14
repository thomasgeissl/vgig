import React from "react";
import { Text } from "@react-three/drei/Text";

export default (props) => {
  return (
    <Text
      {...props}
      color="white"
      anchorX="center" // default
      anchorY="middle" // default
    >
      wstg
    </Text>
  );
};
