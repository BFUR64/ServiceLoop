import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";

import Nav from "./components/pages/Nav";
import Popup from "./components/modals/Popup";

import "./App.scss";
import Dashboard from "./components/pages/dashboard/Dashboard";
import VehicleEditForm from "./components/pages/VehicleEditForm";
import ItemEditForm from "./components/pages/item/ItemEditForm";
import { Settings } from "./components/pages/Settings";

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

      <Popup />
    </Stack>
  );
}

export default App;
