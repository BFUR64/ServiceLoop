import { Navigate, useParams } from "react-router-dom";
import { useServiceData } from "../../../hooks/useServiceData.ts";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import TaskEditForm from "./TaskEditForm.tsx";
import MaintenanceEditForm from "./MaintenanceEditForm.tsx";
import BackButton from "../../items/BackButton.tsx";

function ItemEditForm() {
  const { vehicleId, itemId } = useParams();
  const serviceData = useServiceData();

  const vehicle = serviceData.vehicles.find(
    (vehicle) => vehicle.id === vehicleId,
  );

  const taskItem = vehicle?.taskItems.find((item) => item.id === itemId);
  const maintenanceItem = vehicle?.maintenanceItems.find(
    (item) => item.id === itemId,
  );

  const [isTaskItem, setTaskItem] = useState(taskItem != null);

  if (vehicle == null) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Stack spacing={2} sx={{ overflow: "auto", padding: 2 }}>
      <BackButton vehicle={vehicle} />
      {isTaskItem ? (
        <TaskEditForm
          vehicleId={vehicle.id}
          item={taskItem}
          typeSwitcherProp={{ isTaskItem, setTaskItem }}
        />
      ) : (
        <MaintenanceEditForm
          vehicleId={vehicle.id}
          vehicleOdometer={vehicle.currentOdometer}
          item={maintenanceItem}
          typeSwitcherProp={{ isTaskItem, setTaskItem }}
        />
      )}
    </Stack>
  );
}

export default ItemEditForm;
