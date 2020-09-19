import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Freeverb, PingPongDelay, Master, Sampler } from "tone";
import A from "../assets/A.mp3"
const samples = {
    C3: A
}

export default () => {
  const [instrument, setInstrument] = useState(null);
//   const note = useSelector(getNote(type));
//   const velocity = useSelector(getVelocity(type));
//   const user = useSelector(getUser(type));

  useEffect(() => {
    const inst = new Sampler(samples);
    inst.volume.value = -6;
    const reverb = new Freeverb(0.6, 5000);
    const pingPongDelay = new PingPongDelay({
      delayTime: "32n",
      feedback: 0.7,
      wet: 0.25,
    });
    inst.volume.value = -24;
    inst.connect(pingPongDelay);
    pingPongDelay.connect(reverb);
    reverb.connect(Master);
    setInstrument(inst);
  }, []);

//   useEffect(() => {
//     if (instrument) {
//       if (note) {
//         // TODO: check why this is not working
//         // instrument.triggerAttack(note, 0, velocity);
//         instrument.triggerAttack(note, undefined, velocity);
//       } else {
//         instrument.triggerRelease();
//       }
//     }
//   }, [instrument, note, velocity]);

  return (
      <h1 onClick={()=> instrument.triggerAttackRelease("C3", 0.2)}>orchestra</h1>
  );
};
