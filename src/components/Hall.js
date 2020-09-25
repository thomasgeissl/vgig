import React from "react"
import styled from "styled-components"
import Audience from "./Audience"
import Orchestra from "./Orchestra"

const Container = styled.div`
    .audience {
        width: 100%;
        height: 33%;
    }
    width: 100%;
    height: 100%;
`
export default () => {
    return (
        <Container>
            <Orchestra className="orchestra"></Orchestra>
            <Audience className="audience"></Audience>
        </Container>
    )
}