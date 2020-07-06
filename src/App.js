import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import {Home} from "./pages";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
