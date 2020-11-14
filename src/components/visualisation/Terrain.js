import React, { useMemo } from "react";
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
    const fft = analyser.getValue();
    console.log(fft, geometryRef.current.vertices.length);
    fft.forEach((value, index) => {
      geometryRef.current.vertices[index].y = Math.abs(value * -0.008) * 2;
      //   console.log(index, value);
    });
    geometryRef.current.elementsNeedUpdate = true;
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
