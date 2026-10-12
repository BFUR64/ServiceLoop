import Dashboard from "./components/pages/dashboard/Dashboard";

import "./App.scss";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/pages/Nav";
import VehicleEditForm from "./components/pages/VehicleEditForm";
import Popup from "./components/modals/Popup";
import { Stack } from "@mui/material";

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

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Popup />
    </Stack>
  );
}

export default App;
