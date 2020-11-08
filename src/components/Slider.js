import React from "react";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
  justify-content: center;
`;

const SliderContainer = styled.div`
  width: 100%;
  text-align: center;
`;
const StyledSlider = styled(Slider)`
  height: 50px !important;
`;

const Label = styled.div`
  color: white;
  margin-top: 5px;
`;

export default ({ value, onChange, min, max, label }) => {
  return (
    <Container>
      <SliderContainer>
        <StyledSlider
          orientation="vertical"
          //   getAriaValueText={valuetext}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
        />
      </SliderContainer>
      <Label>{label}</Label>
    </Container>
  );
};
