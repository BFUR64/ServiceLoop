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
import AppThemeProvider from "./services/AppThemeProvider.tsx";

await initHandle();
initDataService();
await loadData();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppThemeProvider>
      <BrowserRouter basename="/ServiceLoop/">
        <App />
      </BrowserRouter>
    </AppThemeProvider>
  </StrictMode>,
);
