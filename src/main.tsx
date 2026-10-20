import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { loadData } from "./state/ServiceDataMemory.ts";
import initServiceDataMemoryListener from "./services/ServiceDataMemoryListener.ts";
import "./main.scss";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppThemeProvider from "./services/AppThemeProvider.tsx";
import { initHandle } from "./fs-adapters/fs-api/DirectoryAccess.ts";
import { initFolderChangeListener } from "./services/FolderChangeListener.ts";
import { initFileUpdaterListener } from "./services/FileUpdater.ts";

await initHandle();
await loadData();

initServiceDataMemoryListener();
initFolderChangeListener();
initFileUpdaterListener();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppThemeProvider>
      <BrowserRouter basename="/ServiceLoop/">
        <App />
      </BrowserRouter>
    </AppThemeProvider>
  </StrictMode>,
);
