import React from "react";
import { useSelector } from "react-redux";

import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  Glitch,
} from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

export default () => {
  const glitch = useSelector((state) => state.mixer.glitch);
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      <Noise opacity={0.05} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
      <Glitch
        delay={[1.5, 10.5]} // min and max glitch delay
        duration={[0.05, 0.4]} // min and max glitch duration
        strength={[0.002, 0.02]} // min and max glitch strength
        mode={GlitchMode.SPORADIC} // glitch mode
        ratio={0.48} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
        active={glitch}
      />
    </EffectComposer>
  );
};
