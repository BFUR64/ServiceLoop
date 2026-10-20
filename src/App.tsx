import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";

import Nav from "./components/pages/Nav";

import "./App.scss";
import Dashboard from "./components/pages/dashboard/Dashboard";
import VehicleEditForm from "./components/pages/VehicleEditForm";
import { Settings } from "./components/pages/Settings";
import ItemEditForm from "./components/pages/item-editor/ItemEditForm";
import Notes from "./components/modals/NotesPopup";
import Confirm from "./components/modals/ConfirmPopup";
import FSPopup from "./components/modals/FSPopup";
import Toast from "./components/modals/Toast";

function App() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <Stack className="app-container">
      <Nav isPrimary={isDashboard} />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:vehicleId" element={<Dashboard />} />

        <Route path="/vehicle" element={<VehicleEditForm />} />
        <Route path="/vehicle/:vehicleId" element={<VehicleEditForm />} />

        <Route path="/vehicle/:vehicleId/item" element={<ItemEditForm />} />
        <Route
          path="/vehicle/:vehicleId/item/:itemId"
          element={<ItemEditForm />}
        />

        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <Notes />
      <Confirm />
      <FSPopup />
      <Toast />
    </Stack>
  );
}

export default App;
