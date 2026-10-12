import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { loadData } from "./state/DataStorage.ts";
import initDataService from "./services/DataService.ts";
import "./main.scss";
import { initHandle } from "./utils/HandleState.ts";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline } from "@mui/material";

await initHandle();
initDataService();
await loadData();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter basename="/ServiceLoop/">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
