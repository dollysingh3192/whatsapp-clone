import React from "react";
import { createRoot } from "react-dom/client";
import RootApp from "./app";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RootApp />
      </Provider>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
