import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import AddCircle from "@mui/icons-material/AddCircle";
import type { ServiceData } from "../../../models/ServiceData";
import { LAST_VEHICLE_SELECTED } from "../../../models/PreferenceStore";

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
          onChange={(event) => {
            const vehicleSelected = event.target.value;

            localStorage.setItem(LAST_VEHICLE_SELECTED, vehicleSelected);
            navigate(`/dashboard/${vehicleSelected}`);
          }}
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
