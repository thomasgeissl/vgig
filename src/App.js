import React from 'react';
import { Provider } from "react-redux";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styled from "styled-components"

import Home from "./components/Home"
import Hall from "./components/Hall"
import Context, {Provider as ContextProvider} from "./Context"

import store from "./store";


const App = styled.div`
  width: 100vw;
  height: 100vh;
`

export default () => {
  return (
    <App>
      <Provider store={store}>
      <Router>
        <Switch>
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
      </Provider>
    </App>
  )
};
