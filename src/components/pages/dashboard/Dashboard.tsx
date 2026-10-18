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
import calculateDue from "../../../utils/DueCalculator";

export function Dashboard() {
  const serviceData = useServiceData();

  const { vehicleId } = useParams();

  const vehicleSelected = serviceData.vehicles.find(
    (vehicle) => vehicle.id === vehicleId,
  );

  const navigate = useNavigate();

  const sortedItems = vehicleSelected?.maintenanceItems
    .map((item) => ({
      item,
      due: calculateDue({
        ...item,
        currentOdometer: vehicleSelected.currentOdometer,
      }),
    }))
    .sort((a, b) => {
      const priorityDiff = Number(b.item.priority) - Number(a.item.priority);

      if (priorityDiff !== 0) return priorityDiff;

      const dueDiff = a.due - b.due;

      if (dueDiff !== 0) return dueDiff;

      return a.item.name.localeCompare(b.item.name);
    });
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
                  {vehicleSelected.taskItems
                    .toSorted((a, b) => Number(b.priority) - Number(a.priority))

                    .map((item) => (
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
                  {sortedItems?.map(({ item, due }) => (
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
                      progressBar={due}
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
