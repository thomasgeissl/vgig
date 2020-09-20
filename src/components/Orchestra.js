import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Freeverb, PingPongDelay, Master, Sampler } from "tone";
import client from "../mqtt"
import {status as statusTypes} from "../midi"
import A from "../assets/A.mp3"
import Violin_C3 from "../assets/violin_c3.mp3"

const samples = {
    C3: A
}

const violinSamples = {
    C3: Violin_C3
}

export default () => {
  const [percussion, setPercussion] = useState(null);
  const [violin, setViolin] = useState(null);

  useEffect(() => {
    const percussion = new Sampler(samples);
    percussion.volume.value = -6;
    const reverb = new Freeverb(0.6, 5000);
    const pingPongDelay = new PingPongDelay({
      delayTime: "32n",
      feedback: 0.7,
      wet: 0.25,
    });
    percussion.volume.value = 0;
    percussion.connect(pingPongDelay);
    pingPongDelay.connect(reverb);
    reverb.connect(Master);
    setPercussion(percussion);

    const violin = new Sampler(violinSamples)
    violin.volume.value = 0
    violin.connect(Master)
    setViolin(violin)
  }, []);

  useEffect(() => {
    // TODO: only fire once
    client.on('message', function (topic, message) {
      const {channel, note, velocity, status} = JSON.parse(message.toString())
      if(status != statusTypes.noteOn) return
      switch(channel){
        case 1: {
          if(percussion) percussion.triggerAttackRelease(note)
          break;
        }
        case 2: {
          if(violin) violin.triggerAttackRelease(note)
          break;
        }
      }
    })
    client.subscribe("vgig/midi")
  }, [percussion, violin], ()=> {
      client.unsubscribe("vgig/midi")
  });

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
      <h1 onClick={()=> percussion.triggerAttackRelease("C3", 0.2)}>orchestra</h1>
  );
};
