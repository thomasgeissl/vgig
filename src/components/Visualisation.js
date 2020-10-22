import React, { useState, useEffect, useMemo, useRef} from "react";
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame } from 'react-three-fiber'
import { Text } from "@react-three/drei/Text"


extend(meshline)

export default ({analyzer}) => {
    useFrame(() => {
      // console.log("new frame", analyzer.getValue())
    })
    return (
        <>
        <Text
  color="white" // default
  anchorX="center" // default
  anchorY="middle" // default
>
    here will be an audio visualisation
</Text>
            {/* <Lines count={fftValues.length} colors={['rgb(100,0,0)', '#222', '#aaa', '#e0feff', 'rgb(100,0,60)', 'rgb(127,32,64)']} /> */}
            {
                // fftValues.forEach((value, index) => {
                //     console.log(value, index)
                // })
            }
        </>
    )
}