import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useUpdate, useFrame } from "react-three-fiber";
import SimplexNoise from "simplex-noise";

const generateTerrain = (simplex, size, height, levels, scale, offset) => {
  const noise = (level, x, z) =>
    simplex.noise2D(
      offset.x * scale + scale * level * x,
      offset.z * scale + scale * level * z
    ) /
      level +
    (level > 1 ? noise(level / 2, x, z) : 0);
  return Array.from({ length: size ** 2 }, (_, i) => {
    let x = (i % size) / size - 0.5;
    let z = Math.floor(i / size) / size - 0.5;
    return {
      x: (offset.x + x) * scale,
      y: noise(2 ** levels, x, z) * height,
      z: (offset.z + z) * scale,
    };
  });
};

let frameCounter = 0;
const Terrain = ({
  seed,
  size,
  height,
  levels = 3,
  scale = 1,
  offset = { x: 0, z: 0 },
  color,
  analyser,
}) => {
  const simplex = useMemo(() => new SimplexNoise(seed), [seed]);
  const intensity = useSelector((state) => state.mixer.intensity);

  const geometryRef = useUpdate(
    (geometry) => {
      geometry.vertices = generateTerrain(
        simplex,
        size,
        height,
        levels,
        scale,
        offset
      );
      geometry.elementsNeedUpdate = true;
    },
    [size, height, levels, scale, offset, seed]
  );
  useFrame(() => {
    frameCounter++;
    if (frameCounter % 4 === 0) {
      const fft = analyser.getValue();
      const sum = fft.reduce(function (a, b) {
        return a + b;
      }, 0);
      if (sum === -Infinity) {
        // geometryRef.current.vertices[0].y = 5; //Math.abs(value * -0.008) * 2;
        // geometryRef.current.vertices[31].y = 5; //Math.abs(value * -0.008) * 2;
        // geometryRef.current.vertices[124].y = 5; //Math.abs(value * -0.008) * 2;
        // geometryRef.current.vertices[1000].y = 5; //Math.abs(value * -0.008) * 2;
        // geometryRef.current.vertices[1000].y = 5; //Math.abs(value * -0.008) * 2;
        // geometryRef.current.elementsNeedUpdate = true;
        return;
      }
      fft.forEach((value, index) => {
        const remainder = index % 32;
        const mappedIndex = Math.floor(index / 32) + remainder * 32;
        geometryRef.current.vertices[mappedIndex].y =
          // Math.abs(value * -0.008) * intensity;
          value * -0.008 * intensity - intensity;
        // geometryRef.current.vertices[index].y = Math.abs(value * -0.008) * 2;
      });
      geometryRef.current.elementsNeedUpdate = true;
    }
  });
  useFrame(() => {
    // console.log(geometryRef.current); //.y += 0.3;
  });

  return (
    <mesh>
      <planeGeometry
        attach="geometry"
        args={[undefined, undefined, size - 1, size - 1]}
        ref={geometryRef}
      />
      <meshBasicMaterial attach="material" color={color} wireframe />
    </mesh>
  );
};

export default Terrain;
