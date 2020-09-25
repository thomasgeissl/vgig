import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from "styled-components"
import Conductor from "./components/Conductor"
import Hall from "./components/Hall"

const App = styled.div`
width: 100vw;
height: 100vh;
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
            <Hall />
          </Route>
        </Switch>
          </Router>
    </App>
  )
};
