import React from "react";
import { createRoot } from "react-dom/client";
import RootApp from "./app";
import "./index.css";

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <RootApp />
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
