import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";

import Nav from "./components/pages/Nav";
import Popup from "./components/modals/Popup";

import "./App.scss";

const Dashboard = lazy(() => import("./components/pages/dashboard/Dashboard"));
const VehicleEditForm = lazy(
  () => import("./components/pages/VehicleEditForm"),
);
const ItemEditForm = lazy(() => import("./components/pages/item/ItemEditForm"));

function App() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <Stack className="app-container">
      <Nav isPrimary={isDashboard} />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:vehicleId" element={<Dashboard />} />

          <Route path="/vehicle" element={<VehicleEditForm />} />
          <Route path="/vehicle/:vehicleId" element={<VehicleEditForm />} />

          <Route path="/vehicle/:vehicleId/item/" element={<ItemEditForm />} />
          <Route
            path="/vehicle/:vehicleId/item/:itemId"
            element={<ItemEditForm />}
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>

      <Popup />
    </Stack>
  );
}

export default App;
