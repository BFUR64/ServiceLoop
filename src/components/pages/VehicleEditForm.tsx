import { useNavigate, useParams } from "react-router-dom";
import { useServiceData } from "../../hooks/DataHook.ts";
import { useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";

import * as dataStorage from "../../state/DataStorage.ts";
import { Box, Button, Stack, TextField } from "@mui/material";

interface VehicleDraft {
  nickname: string;
  note: string | null;
  make: string | null;
  model: string | null;
  trim: string | null;
  year: string | null;
  engine: string | null;
  fuel: string | null;
  currentOdometer: number;
}

function VehicleEditForm() {
  const { vehicleId } = useParams();
  const serviceData = useServiceData();

  const vehicle = serviceData.vehicles.find(
    (vehicle) => vehicle.id === vehicleId,
  );

  const [draft, setDraft] = useState<VehicleDraft>(() => ({
    nickname: vehicle?.nickname ?? "",
    note: vehicle?.note ?? null,
    make: vehicle?.make ?? null,
    model: vehicle?.model ?? null,
    trim: vehicle?.trim ?? null,
    year: vehicle?.year ?? null,
    engine: vehicle?.engine ?? null,
    fuel: vehicle?.fuel ?? null,
    currentOdometer: vehicle?.currentOdometer ?? 0,
  }));

  const navigate = useNavigate();

  return (
    <Stack spacing={2} sx={{ overflow: "auto", padding: 2 }}>
      <Box>
        <Button
          variant="contained"
          onClick={() =>
            vehicle != null
              ? navigate(`/dashboard/${vehicle.id}`)
              : navigate("/dashboard")
          }
        >
          <IconArrowLeft />
        </Button>
      </Box>

      <Stack spacing={4}>
        <TextField
          label="Name"
          value={draft.nickname}
          onChange={(event) =>
            setDraft({ ...draft, nickname: event.currentTarget.value })
          }
        />

        <TextField
          label="Note"
          value={draft.note ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, note: event.currentTarget.value || null })
          }
        />

        <TextField
          label="Make"
          value={draft.make ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, make: event.currentTarget.value || null })
          }
        />

        <TextField
          label="Model"
          value={draft.model ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, model: event.currentTarget.value || null })
          }
        />

        <TextField
          label="Trim"
          value={draft.trim ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, trim: event.currentTarget.value || null })
          }
        />

        <TextField
          label="Year"
          value={draft.year ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, year: event.currentTarget.value || null })
          }
        />

        <TextField
          label="Engine"
          value={draft.engine ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, engine: event.currentTarget.value || null })
          }
        />

        <TextField
          label="Fuel"
          value={draft.fuel ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, fuel: event.currentTarget.value || null })
          }
        />

        <TextField
          label="Current Odometer"
          type="number"
          value={draft.currentOdometer}
          onChange={(event) =>
            setDraft({
              ...draft,
              currentOdometer: Number(event.currentTarget.value),
            })
          }
        />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        {vehicle != null ? (
          <Button
            variant="contained"
            onClick={() => {
              dataStorage.updateVehicle(vehicle.id, {
                nickname: draft.nickname,
                note: draft.note,
                make: draft.make,
                model: draft.model,
                trim: draft.trim,
                year: draft.year,
                engine: draft.engine,
                fuel: draft.fuel,
                currentOdometer: draft.currentOdometer,
              });
              navigate(`/dashboard/${vehicle.id}`);
            }}
          >
            Save Changes
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              const newId = crypto.randomUUID();
              dataStorage.addVehicle({
                id: newId,
                nickname: draft.nickname,
                note: draft.note,
                make: draft.make,
                model: draft.model,
                trim: draft.trim,
                year: draft.year,
                engine: draft.engine,
                fuel: draft.fuel,
                currentOdometer: draft.currentOdometer,
                taskItems: [],
                maintenanceItems: [],
              });
              navigate(`/dashboard/${newId}`);
            }}
          >
            Save Vehicle
          </Button>
        )}
        {vehicle != null ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              dataStorage.removeVehicle(vehicle.id);
              navigate(`/dashboard`);
            }}
          >
            Delete Vehicle
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );
}

export default VehicleEditForm;
