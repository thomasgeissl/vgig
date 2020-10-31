import React from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";

import { setVolumeInteractions } from "../store/reducers/mixer";
import Section from "./Section";

const Container = styled.div`
  background-color: black;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  height: 50px !important;
`;

export default () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <Section title={"light"} color={"rgb(220, 46, 40)"}></Section>
        </Grid>
        <Grid item xs={6}>
          <Section title={"audio"} color={"rgb(220, 46, 40)"}>
            <StyledSlider
              orientation="vertical"
              //   getAriaValueText={valuetext}
              defaultValue={-100}
              min={-100}
              max={0}
              onChange={(event, value) => {
                dispatch(setVolumeInteractions(value));
              }}
              aria-labelledby="vertical-slider"
            />
            <StyledSlider
              orientation="vertical"
              //   getAriaValueText={valuetext}
              defaultValue={-100}
              min={-100}
              max={0}
              onChange={(event, value) => {
                // dispatch(setVolumeInteractions(value))
              }}
              aria-labelledby="vertical-slider"
            />
          </Section>
        </Grid>
      </Grid>
    </Container>
  );
};
