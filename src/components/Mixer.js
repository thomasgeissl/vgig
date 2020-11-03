import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";

import { setVolumeInteractions, setVolumeStage } from "../store/reducers/mixer";
import Section from "./Section";
import Button from "./Button";

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
  const stageVolume = useSelector((state) => state.mixer.volumeStage);
  const interactionsVolume = useSelector(
    (state) => state.mixer.volumeInteractions
  );
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
            <StyledSlider
              orientation="vertical"
              //   getAriaValueText={valuetext}
              defaultValue={-100}
              min={-100}
              max={0}
              value={stageVolume}
              onChange={(event, value) => {
                dispatch(setVolumeStage(value));
              }}
            />
            <StyledSlider
              orientation="vertical"
              //   getAriaValueText={valuetext}
              defaultValue={-100}
              min={-100}
              max={0}
              value={interactionsVolume}
              onChange={(event, value) => {
                dispatch(setVolumeInteractions(value));
              }}
            />
          </Section>
        </Grid>
      </Grid>
    </Container>
  );
};
