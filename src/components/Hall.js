import React, {useEffect, useContext} from "react"
import { useParams } from "react-router-dom";
import styled from "styled-components"
import Audience from "./Audience"
import Orchestra from "./Orchestra"

import Context from "../Context"

const Container = styled.div`
    .audience {
        width: 100%;
        height: 33%;
    }
    width: 100%;
    height: 100%;
`
export default () => {
    const { id } = useParams();
    const [context, setContext] = useContext(Context)
    useEffect(()=> {
        setContext({...context, hallId: id})
        console.log("send hello", context.userId, id)
    },[id])
    return (
        <Container>
            <Orchestra className="orchestra" id={id}></Orchestra>
            <Audience className="audience" id={id}></Audience>
        </Container>
    )
}