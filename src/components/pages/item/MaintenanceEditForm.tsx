import { useState } from "react";
import type {
  IntervalTime,
  MaintenanceItem,
  TimeUnit,
} from "../../../utils/FileHandler";
import type { TypeSwitcherProp } from "./TypeSwitcher";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AddCircle from "@mui/icons-material/AddCircle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

import TypeSwitcher from "./TypeSwitcher";
import * as dataStorage from "../../../state/DataStorage.ts";

interface MaintenanceDraft {
  name: string;
  note: string | null;
  dateServiced: string;
  mileageServiced: number;
  intervalKm: number | null;
  intervalTime: IntervalTime;
}

interface MaintenanceEditProp {
  vehicleId: string;
  vehicleOdometer: number;
  item: MaintenanceItem | undefined;
  typeSwitcherProp: TypeSwitcherProp;
}

function MaintenanceEditForm({
  vehicleId,
  vehicleOdometer,
  item,
  typeSwitcherProp,
}: MaintenanceEditProp) {
  const [draft, setDraft] = useState<MaintenanceDraft>(() => ({
    name: item?.name ?? "",
    note: item?.note ?? null,
    dateServiced: item?.dateServiced || new Date().toISOString(),
    mileageServiced: item?.mileageServiced ?? 0,
    intervalKm: item?.intervalKm ?? null,
    intervalTime: item?.intervalTime ?? {
      value: null,
      unit: "month",
    },
  }));

  const [unitSelected, setUnitSelected] = useState<TimeUnit>(
    () => draft.intervalTime.unit,
  );

  const navigate = useNavigate();

  return (
    <>
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
            note: event.target.value,
          }))
        }
      />
      <TypeSwitcher {...typeSwitcherProp} />
      <Stack spacing={2}>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", fontWeight: 500 }}>
          Service Details
        </Typography>

        <Stack direction="row" spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ flex: 1 }}
              label="Date Serviced"
              value={dayjs(draft.dateServiced)}
              onChange={(newDate) => {
                const date = newDate?.toISOString();

                setDraft((previous) => ({
                  ...previous,
                  dateServiced: date != null ? date : Date.now().toString(),
                }));
              }}
            />
          </LocalizationProvider>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flex: 1, alignItems: "center" }}
          >
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
            <Tooltip title="Change to current odometer">
              <IconButton
                onClick={() => {
                  setDraft((previous) => ({
                    ...previous,
                    mileageServiced: vehicleOdometer,
                  }));
                }}
              >
                <AddCircle />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", fontWeight: 500 }}>
          Next Service (Optional)
        </Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            label="km"
            type="number"
            sx={{ flex: 1 }}
            value={draft.intervalKm || ""}
            onChange={(event) => {
              const nextValue = event.target.value;

              setDraft((previous) => ({
                ...previous,
                intervalKm: nextValue === "" ? null : Number(nextValue),
              }));
            }}
          />

          <Stack direction="row" spacing={1} sx={{ flex: 1 }}>
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel>Time Unit</InputLabel>
              <Select
                value={unitSelected}
                onChange={(event) => {
                  const nextUnit = event.target.value as TimeUnit;

                  setUnitSelected(nextUnit);
                  setDraft((previous) => ({
                    ...previous,
                    intervalTime: {
                      ...previous.intervalTime,
                      unit: nextUnit,
                    },
                  }));
                }}
              >
                <MenuItem value="day">Day</MenuItem>
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>
            </FormControl>

            <TextField
              sx={{ flex: 1 }}
              type="number"
              value={draft.intervalTime.value ?? ""}
              onChange={(event) => {
                const nextValue = event.target.value;

                setDraft((previous) => ({
                  ...previous,
                  intervalTime: {
                    ...previous.intervalTime,
                    value: nextValue === "" ? null : Number(nextValue),
                  },
                }));
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            if (item != null) {
              dataStorage.updateMaintenanceItem(vehicleId, item.id, draft);
              navigate(`/dashboard/${vehicleId}`);
            } else {
              const newId = crypto.randomUUID();

              dataStorage.addMaintenanceItem(vehicleId, {
                id: newId,
                priority: false,
                ...draft,
              });

              navigate(`/dashboard/${vehicleId}`);
            }
          }}
        >
          {item != null ? "Save Changes" : "Save Item"}
        </Button>
        {item != null && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              dataStorage.removeMaintenanceItem(vehicleId, item.id);
            }}
          >
            Delete Item
          </Button>
        )}
      </Stack>
    </>
  );
}

export default MaintenanceEditForm;
