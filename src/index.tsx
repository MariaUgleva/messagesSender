import React from "react";
import ReactDOM from "react-dom";
import Form from "./Components/Form/Form";
import { createStore } from "redux";
import reducer from "./redux/reducers/rootReducer";
import { Provider } from "react-redux";
import Messages from "./Components/Messages/Messages";
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Form />
    <Messages />
  </Provider>,
  document.getElementById("root")
);
