import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from "styled-components"
import Audience from "./components/Audience"
import Conductor from "./components/Conductor"

const App = styled.div`
width: 100vw;
height: 100vh;
background-color: lightgreen;
`


export default () => {
  return (
    <App>
          <Router>
          <Switch>
          <Route path="/conductor">
            <Conductor />
          </Route>
          <Route path="/">
            <Audience />
          </Route>
        </Switch>
          </Router>
    </App>
  )
};
