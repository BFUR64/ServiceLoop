import Dashboard from "./components/pages/dashboard/Dashboard";

import "./App.scss";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/pages/Nav";
import VehicleEditForm from "./components/pages/VehicleEditForm";

function App() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");
  const isSettings = location.pathname.startsWith("/settings");

  return (
    <div className="app-container">
      <Nav isPrimary={isDashboard || isSettings} />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:vehicleId" element={<Dashboard />} />

        <Route path="/vehicle" element={<VehicleEditForm />} />
        <Route path="/vehicle/:vehicleId" element={<VehicleEditForm />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;
