import React from "react"
import Button from '@material-ui/core/Button';
import client from "../mqtt"

export default () => {
    return (
        <Button variant="contained" color="primary" onClick={()=>{client.publish("vgig/test", JSON.stringify({type: "TRIGGER", payload: {}}))}}>trigger test sample</Button>
    )
}