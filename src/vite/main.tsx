import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProviderContainer } from "morabaa-provider";
import { setDefaultStateKit } from "morabaa-services";
import { Loading } from "../test/states";

setDefaultStateKit({
  loading: Loading,
  loadingMore: Loading,
  demo: ({ title }: any) => (
    <div className="bg-dragon p-4x round-full">
      <h1>demo demo {title}</h1>
    </div>
  ),
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
    {/* <ProviderContainer /> */}
  </BrowserRouter>
);
