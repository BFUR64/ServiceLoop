import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { loadData } from "./state/DataStorage.ts";
import initDataService from "./services/DataService.ts";
import "./main.scss";
import { initHandle } from "./utils/HandleState.ts";
import { BrowserRouter } from "react-router-dom";

await initHandle();
initDataService();
await loadData();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
