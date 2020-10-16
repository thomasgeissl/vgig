import React, { useState, useEffect, useMemo, useRef} from "react";
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame } from 'react-three-fiber'

extend(meshline)

function Fatline({ curve, width, color, speed }) {
    const material = useRef()
    useFrame(() => (material.current.uniforms.dashOffset.value -= speed))
    return (
      <mesh>
        <meshLine attach="geometry" vertices={curve} />
        <meshLineMaterial
          attach="material"
          ref={material}
          transparent
          depthTest={false}
          lineWidth={width}
          color={color}
          dashArray={0.1}
          dashRatio={0.9}
        />
      </mesh>
    )
  }
  
  function Lines({ count, colors }) {
    const lines = useMemo(
      () =>
        new Array(count).fill().map(() => {
          const pos = new THREE.Vector3(10 - Math.random() * 20, 10 - Math.random() * 20, 10 - Math.random() * 20)
          const points = new Array(30)
            .fill()
            .map(() =>
              pos.add(new THREE.Vector3(4 - Math.random() * 8, 4 - Math.random() * 8, 2 - Math.random() * 4)).clone()
            )
          const curve = new THREE.CatmullRomCurve3(points).getPoints(1000)
          return {
            color: colors[parseInt(colors.length * Math.random())],
            width: Math.max(0.1, 0.65 * Math.random()),
            speed: Math.max(0.0001, 0.0005 * Math.random()),
            curve,
          }
        }),
      [colors, count]
    )
    return lines.map((props, index) => <Fatline key={index} {...props} />)
  }
  
export default ({fftValues}) => {
    return (
        <>
            {/* <Lines count={fftValues.length} colors={['rgb(100,0,0)', '#222', '#aaa', '#e0feff', 'rgb(100,0,60)', 'rgb(127,32,64)']} /> */}
            {
                fftValues.forEach((value, index) => {
                    console.log(value, index)
                })
            }
        </>
    )
}