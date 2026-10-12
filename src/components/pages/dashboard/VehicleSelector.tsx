import type { ServiceData } from "../../../utils/FileHandler";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";

interface VehicleSelectorProp {
  vehicleId: string | undefined;
  serviceData: ServiceData;
}

function VehicleSelector({ vehicleId, serviceData }: VehicleSelectorProp) {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="vehicle-select-label">Select a Vehicle</InputLabel>
        <Select
          labelId="vehicle-select-label"
          value={vehicleId ?? ""}
          onChange={(event) => navigate(`/dashboard/${event.target.value}`)}
        >
          {serviceData.vehicles.map((vehicle) => (
            <MenuItem key={vehicle.id} value={vehicle.id}>
              {vehicle.nickname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip title="Add a new vehicle">
        <IconButton onClick={() => navigate(`/vehicle`)}>
          <AddCircle />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default VehicleSelector;
