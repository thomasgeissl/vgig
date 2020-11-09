import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Slider from "./Slider";
import styled from "styled-components";

import {
  setVolumeInteractions,
  setVolumeStage,
  setGlitch,
} from "../store/reducers/mixer";
import Section from "./Section";
import Button from "./Button";

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
  const glitch = useSelector((state) => state.mixer.glitch);
  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <Section title={"light"} color={"rgb(220, 46, 40)"}>
            <Grid container>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    dispatch(setGlitch(!glitch));
                    // publish(`${NAME}/${context.hallId}/${action}`, {
                    //   userId: context.userId,
                    // });
                  }}
                  label={"glitch"}
                ></Button>
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
                    max={0}
                    value={stageVolume}
                    onChange={(event, value) => {
                      dispatch(setVolumeStage(value));
                    }}
                    label={"orchestra"}
                  />
                </SliderContainer>
              </Grid>
              <Grid item xs={6}>
                <Slider
                  orientation="vertical"
                  //   getAriaValueText={valuetext}
                  defaultValue={-100}
                  min={-32}
                  max={0}
                  value={interactionsVolume}
                  onChange={(event, value) => {
                    dispatch(setVolumeInteractions(value));
                  }}
                  label={"audience"}
                />
              </Grid>
            </Grid>
          </Section>
        </Grid>
      </Grid>
    </Container>
  );
};
