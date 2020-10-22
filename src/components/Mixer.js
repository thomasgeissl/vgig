import React from "react"
import { useDispatch } from "react-redux"
import Slider from '@material-ui/core/Slider';
import styled from "styled-components"

import { setVolumeInteractions } from "../store/reducers/mixer"

const Container = styled.div`
width: 25%;
height: 25%;
background-color: lightblue;
position: absolute;
bottom: 0;
left: 37.5%;
display: flex;
flex-direction: row;
`

const StyledSlider = styled(Slider)`
  height: 50px !important;
  `

export default () => {
  const dispatch = useDispatch()
    return (
        <Container>
            {/* <h2>mixer</h2> */}
            <div style={{marginRight: "15px"}}>
              <h3>light</h3>
            </div>
            <div>
              <h3>audio</h3>
            <StyledSlider
          orientation="vertical"
        //   getAriaValueText={valuetext}
          defaultValue={-100}
          min={-100}
          max={0}
          onChange={(event, value) => {
            dispatch(setVolumeInteractions(value))
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
            </div>
        </Container>
    )
}