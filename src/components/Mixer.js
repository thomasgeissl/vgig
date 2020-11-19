import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Slider from "./Slider";
import styled from "styled-components";

import {
  setVolumeInteractions,
  setVolumeStage,
  setIntensity,
  setGlitch,
} from "../store/reducers/mixer";
import Section from "./Section";
import Button from "./Button";

import config from "../config/config.json";

const Container = styled.div`
  background-color: black;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default () => {
  const dispatch = useDispatch();
  const stageVolume = useSelector((state) => state.mixer.volumeStage);
  const interactionsVolume = useSelector(
    (state) => state.mixer.volumeInteractions
  );
  const intensity = useSelector((state) => state.mixer.intensity);
  const glitch = useSelector((state) => state.mixer.glitch);
  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <Section title={"visual"} color={"rgb(220, 46, 40)"}>
            <Grid container>
              <Grid item xs={6}>
                {/* <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    dispatch(setGlitch(!glitch));
                  }}
                  label={"glitch"}
                ></Button> */}
                <Slider
                  orientation="vertical"
                  //   getAriaValueText={valuetext}
                  defaultValue={2}
                  min={2}
                  max={20}
                  value={intensity}
                  onChange={(event, value) => {
                    dispatch(setIntensity(value));
                  }}
                  label={"intensity"}
                />
              </Grid>
            </Grid>
          </Section>
        </Grid>
        <Grid item xs={6}>
          <Section title={"audio"} color={"rgb(220, 46, 40)"}>
            <Grid container style={{ height: "100%" }}>
              <Grid item xs={6}>
                <SliderContainer>
                  <Slider
                    orientation="vertical"
                    //   getAriaValueText={valuetext}
                    defaultValue={-100}
                    min={-32}
                    max={config.maxOrchestraVolume}
                    value={stageVolume}
                    onChange={(event, value) => {
                      dispatch(setVolumeStage(value));
                    }}
                    label={"music"}
                  />
                </SliderContainer>
              </Grid>
              <Grid item xs={6}>
                <Slider
                  orientation="vertical"
                  //   getAriaValueText={valuetext}
                  defaultValue={-100}
                  min={-32}
                  max={config.maxActionVolume}
                  value={interactionsVolume}
                  onChange={(event, value) => {
                    dispatch(setVolumeInteractions(value));
                  }}
                  label={"actions"}
                />
              </Grid>
            </Grid>
          </Section>
        </Grid>
      </Grid>
    </Container>
  );
};
