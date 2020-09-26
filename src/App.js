import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from "styled-components"
import Conductor from "./components/Conductor"
import Home from "./components/Home"
import Hall from "./components/Hall"
import Context, {Provider as ContextProvider}from "./Context"

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
          <Route path="/halls/:id">
      <ContextProvider value={Context}>
              <Hall />
      </ContextProvider>
            </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
          </Router>
    </App>
  )
};
