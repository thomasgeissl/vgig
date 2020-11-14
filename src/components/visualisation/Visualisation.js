import React, { useRef } from "react";
import Terrain from "./Terrain";
import WSTG from "./WSTG";
import config from "../../config/config";

export default ({ analyser, mood }) => {
  const seed = 1;
  const size = 32;
  const height = 0.6;
  const scale = 15;
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

  return (
    <>
      <WSTG position={[-3, 3, 4]}></WSTG>
      <Terrain
        seed={seed}
        size={Math.floor(size)}
        height={height}
        levels={Math.floor(levels)}
        scale={scale}
        color={color}
        analyser={analyser}
      ></Terrain>
    </>
  );
};
