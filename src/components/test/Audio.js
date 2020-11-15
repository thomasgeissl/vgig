import React from "react";
import { Button } from "@material-ui/core";
import { start, Synth, now } from "tone";

export default () => {
  return (
    <>
      <Button
        onClick={() => {
          start();
          const synth = new Synth().toDestination();
          const time = now();
          synth.triggerAttackRelease("C4", "8n", time);
          synth.triggerAttackRelease("E4", "8n", time + 0.5);
          synth.triggerAttackRelease("G4", "8n", time + 1);
        }}
      >
        start
      </Button>
    </>
  );
};
