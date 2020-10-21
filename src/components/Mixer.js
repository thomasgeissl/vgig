import React from "react"
import styled from "styled-components"

const Container = styled.div`
width: 25%;
height: 25%;
background-color: lightblue;
position: absolute;
bottom: 0;
left: 37.5%;
`

export default () => {
    return (
        <Container>
            <h2>mixer</h2>
            <h3>light</h3>
            <h3>audio</h3>
        </Container>
    )
}