import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import reducers from "../reducers/index";

import App from "./App";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class Router extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Router;
