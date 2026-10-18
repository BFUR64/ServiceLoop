import { useServiceData } from "../../../hooks/useServiceData";
import VehicleCard from "./VehicleCard";
import VehicleSelector from "./VehicleSelector";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TaskCard from "./TaskCard";
import MaintenanceCard from "./MaintenanceCard";

export function Dashboard() {
  const serviceData = useServiceData();

  const { vehicleId } = useParams();

  const vehicleSelected = serviceData.vehicles.find(
    (vehicle) => vehicle.id === vehicleId,
  );

  const navigate = useNavigate();

  return (
    <>
      <Stack sx={{ gap: 1, p: 2 }}>
        <VehicleSelector vehicleId={vehicleId} serviceData={serviceData} />
        <VehicleCard vehicleId={vehicleId} vehicleSelected={vehicleSelected} />
      </Stack>

      {vehicleId == undefined || vehicleSelected == undefined ? null : (
        <>
          <Stack
            direction="row"
            sx={{ p: 2, paddingTop: 0, alignItems: "center" }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: "1.25rem", fontWeight: 500, flexGrow: 1 }}
            >
              Upcoming Work
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate(`/vehicle/${vehicleId}/item/`)}
            >
              Add Item
            </Button>
          </Stack>

          <Divider />

          <Stack
            spacing={2}
            sx={{
              p: 1,
              overflow: "auto",
              scrollbarGutter: "stable both-edges",
            }}
          >
            {vehicleSelected.taskItems.length > 0 && (
              <>
                <Typography variant="h3" sx={{ fontSize: "1.15rem" }}>
                  Task
                </Typography>
                <Stack spacing={2}>
                  {vehicleSelected.taskItems.map((item) => (
                    <TaskCard
                      key={item.id}
                      vehicleId={vehicleId}
                      itemId={item.id}
                      name={item.name}
                      note={item.note ?? ""}
                      priority={item.priority}
                    />
                  ))}
                </Stack>
              </>
            )}
            {vehicleSelected.maintenanceItems.length > 0 && (
              <>
                <Typography variant="h3" sx={{ fontSize: "1.15rem" }}>
                  Maintenance
                </Typography>
                <Stack spacing={2}>
                  {vehicleSelected.maintenanceItems.map((item) => (
                    <MaintenanceCard
                      key={item.id}
                      vehicleId={vehicleId}
                      itemId={item.id}
                      name={item.name}
                      note={item.note ?? ""}
                      dateServiced={item.dateServiced}
                      mileageServiced={item.mileageServiced}
                      intervalKm={item.intervalKm}
                      intervalTime={item.intervalTime}
                      currentOdometer={vehicleSelected.currentOdometer}
                      priority={item.priority}
                    />
                  ))}
                </Stack>
              </>
            )}
          </Stack>
        </>
      )}
    </>
  );
}

export default Dashboard;
