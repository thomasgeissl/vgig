import React, { useRef, useState, useEffect } from "react";
import { BoxBufferGeometry, MeshNormalMaterial, Vector3 } from "three";
import { useFrame, useThree } from "react-three-fiber";

const SLOWDOWN = 1;
const ROW = 20;
const BLOCK_AMOUNT = 600;
const SPIKE_AMOUNT = 1000;
const geom = new BoxBufferGeometry(1, 1, 1);
const matr = new MeshNormalMaterial();
const rpi = () => Math.random() * Math.PI;

function Block({ change, ...props }) {
  const [color] = useState(0);

  // Artificial slowdown ...
  if (color > 0) {
    const e = performance.now() + SLOWDOWN;
    while (performance.now() < e) {}
  }

  //   useEffect(() => {
  //     if (change)
  //       setTimeout(
  //         () => run(low, () => set(Math.round(Math.random() * 0xffffff))),
  //         Math.random() * 1000
  //       );
  //   }, [change]);

  return (
    <mesh {...props} geometry={geom}>
      <meshBasicMaterial attach="material" color={color} />
    </mesh>
  );
}

function Blocks() {
  const [changeBlocks, set] = useState(false);
  useEffect(() => {
    const handler = setInterval(() => set((state) => !state), 2000);
    return () => clearInterval(handler);
  });

  const { viewport } = useThree();
  const { width, height } = viewport().factor;
  const size = width / 100 / ROW;
  return new Array(BLOCK_AMOUNT).fill().map((_, i) => {
    const left = -width / 100 / 2 + size / 2;
    const top = height / 100 / 2 - size / 2;
    const x = (i % ROW) * size;
    const y = Math.floor(i / ROW) * -size;
    return (
      <Block
        key={i}
        change={changeBlocks}
        scale={[size, size, size]}
        position={[left + x, top + y, 0]}
      />
    );
  });
}

function Box() {
  let t = 0;
  const mesh = useRef();
  const [coords] = useState(() => [rpi(), rpi(), rpi()]);
  useFrame(
    () =>
      mesh.current &&
      mesh.current.rotation.set(
        coords[0] + (t += 0.01),
        coords[1] + t,
        coords[2] + t
      )
  );
  return <mesh ref={mesh} geometry={geom} material={matr} scale={[2, 2, 2]} />;
}

function AnimatedSpikes() {
  return new Array(SPIKE_AMOUNT).fill().map((_, i) => <Box key={i} />);
}

export default () => {
  return (
    <>
      <Blocks />
      <AnimatedSpikes />
    </>
  );
};
