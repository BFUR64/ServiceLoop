import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useServiceData } from "../../hooks/DataHook";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconArrowLeft } from "@tabler/icons-react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";

interface ItemDraft {
  name: string;
  note: string | null;
  type: ItemType;
  dateServiced: Date;
  mileageServiced: number;
}

type ItemType = "task" | "maintenance";

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

  const [draft, setDraft] = useState<ItemDraft>(() => {
    const selectedItem = taskItem ?? maintenanceItem;

    return {
      name: selectedItem?.name ?? "",
      note: selectedItem?.note ?? null,
      type: taskItem != null ? "task" : "maintenance",
      dateServiced:
        selectedItem === maintenanceItem && maintenanceItem != null
          ? new Date(maintenanceItem.dateServiced)
          : new Date(0),
      mileageServiced:
        selectedItem === maintenanceItem && maintenanceItem != null
          ? maintenanceItem.mileageServiced
          : 0,
    };
  });

  const navigate = useNavigate();

  if (vehicle == null) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Stack spacing={2} sx={{ overflow: "auto", padding: 2 }}>
      <Box>
        <Tooltip title="Go back to dashboard">
          <Button
            variant="contained"
            onClick={() => navigate(`/dashboard/${vehicle.id}`)}
          >
            <IconArrowLeft />
          </Button>
        </Tooltip>
      </Box>

      <TextField
        label="Name"
        value={draft.name}
        onChange={(event) =>
          setDraft((previous) => ({ ...previous, name: event.target.value }))
        }
      />
      <TextField
        label="Note"
        value={draft.note ?? ""}
        onChange={(event) =>
          setDraft((previous) => ({
            ...previous,
            note: event.target.value || null,
          }))
        }
      />

      <Stack>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", fontWeight: 500 }}>
          Item Type
        </Typography>

        <FormControl>
          <RadioGroup
            row
            value={draft.type}
            onChange={(_, value) =>
              setDraft((previous) => ({ ...previous, type: value as ItemType }))
            }
          >
            <FormControlLabel
              control={<Radio />}
              value="maintenance"
              label="Maintenance"
            />
            <FormControlLabel control={<Radio />} value="task" label="Task" />
          </RadioGroup>
        </FormControl>
      </Stack>

      {draft.type === "maintenance" && (
        <>
          <Stack spacing={2}>
            <Typography
              variant="h2"
              sx={{ fontSize: "1.25rem", fontWeight: 500 }}
            >
              Serviced
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "space-evenly" }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ flex: 1 }}
                  label="Date Serviced"
                  value={dayjs(draft.dateServiced)}
                  onChange={(newDate) => {
                    setDraft((previous) => ({
                      ...previous,
                      dateServiced: newDate?.toDate() ?? new Date(0),
                    }));
                  }}
                />
              </LocalizationProvider>
              <TextField
                sx={{ flex: 1 }}
                label="Mileage (km)"
                type="number"
                value={draft.mileageServiced}
                onChange={(event) =>
                  setDraft((previous) => ({
                    ...previous,
                    mileageServiced: Number(event.target.value),
                  }))
                }
              />
            </Stack>
          </Stack>
          <Stack>
            <Typography
              variant="h2"
              sx={{ fontSize: "1.25rem", fontWeight: 500 }}
            >
              Next Interval
            </Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default ItemEditForm;
