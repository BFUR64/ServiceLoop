import { Navigate, useNavigate, useParams } from "react-router-dom";
import type {
  IntervalTime,
  MaintenanceItem,
  TaskItem,
  TimeUnit,
  VehicleData,
} from "../../utils/FileHandler";
import { useServiceData } from "../../hooks/DataHook";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as dataStorage from "../../state/DataStorage.ts";
import { AddCircle } from "@mui/icons-material";

interface TaskDraft {
  name: string;
  note: string | null;
}

interface MaintenanceDraft {
  name: string;
  note: string | null;
  dateServiced: string;
  mileageServiced: number;
  intervalKm: number | null;
  intervalTime: IntervalTime;
}

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

interface BackButtonProp {
  vehicle: VehicleData;
}

function BackButton({ vehicle }: BackButtonProp) {
  const navigate = useNavigate();

  return (
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
  );
}

interface TaskEditFormProp {
  vehicleId: string;
  item: TaskItem | undefined;
  typeSwitcherProp: TypeSwitcherProp;
}

function TaskEditForm({ vehicleId, item, typeSwitcherProp }: TaskEditFormProp) {
  const [draft, setDraft] = useState<TaskDraft>(() => ({
    name: item?.name ?? "",
    note: item?.note ?? null,
  }));

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

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            if (item != null) {
              dataStorage.updateTaskItem(vehicleId, item.id, draft);
              navigate(`/dashboard/${vehicleId}`);
            } else {
              const newId = crypto.randomUUID();

              dataStorage.addTaskItem(vehicleId, {
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
              dataStorage.removeTaskItem(vehicleId, item.id);
            }}
          >
            Delete Item
          </Button>
        )}
      </Stack>
    </>
  );
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

interface TypeSwitcherProp {
  isTaskItem: boolean;
  setTaskItem: React.Dispatch<React.SetStateAction<boolean>>;
}

function TypeSwitcher({ isTaskItem, setTaskItem }: TypeSwitcherProp) {
  const type = isTaskItem ? "task" : "maintenance";

  return (
    <Stack>
      <Typography variant="h2" sx={{ fontSize: "1.25rem", fontWeight: 500 }}>
        Item Type
      </Typography>
      <FormControl>
        <RadioGroup
          row
          value={type}
          onChange={(_, value) => setTaskItem(value === "task")}
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
  );
}

export default ItemEditForm;
