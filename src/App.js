import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Home from "./components/Home";
import Admin from "./components/Admin";
import Hall from "./components/Hall";
import Context, { Provider as ContextProvider } from "./Context";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import store from "./store";

import Audio from "./components/test/Audio";
import Visual from "./components/test/Visual";

const App = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default () => {
  return (
    <App>
      <ThemeProvider theme={theme}>
        <StoreProvider store={store}>
          <Router>
            <Switch>
              <Route path="/test/audio">
                <Audio></Audio>
              </Route>
              <Route path="/test/visual">
                <Visual></Visual>
              </Route>
              <Route path="/halls/:id/admin">
                <ContextProvider value={Context}>
                  <Admin></Admin>
                </ContextProvider>
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
        </StoreProvider>
      </ThemeProvider>
    </App>
  );
};
