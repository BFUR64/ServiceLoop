import { useNavigate, useParams } from "react-router-dom";
import { useServiceData } from "../../hooks/useServiceData.ts";
import { useState } from "react";

import * as dataStorage from "../../state/ServiceDataMemory.ts";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import BackButton from "../shared/BackButton.tsx";
import { validateName, normalizeOdometer } from "../../utils/InputUtils.ts";
import { confirmPopup } from "../../hooks/useConfirmPopup.ts";

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

  const [nameMessage, setNameMessage] = useState("");

  const navigate = useNavigate();

  return (
    <Stack spacing={2} sx={{ overflow: "auto", padding: 2 }}>
      <BackButton vehicle={vehicle} />

      <Stack spacing={4}>
        <TextField
          label="Name"
          error={Boolean(nameMessage)}
          value={draft.nickname}
          helperText={nameMessage}
          onChange={(event) => {
            const text = event.currentTarget.value;

            setDraft({ ...draft, nickname: text });
            setNameMessage(validateName(text));
          }}
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
          label="Odometer (km)"
          type="text"
          inputMode="numeric"
          value={draft.currentOdometer}
          onChange={(event) =>
            setDraft({
              ...draft,
              currentOdometer: normalizeOdometer(event.currentTarget.value),
            })
          }
        />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            const error = validateName(draft.nickname);

            setNameMessage(error);

            if (error) {
              return;
            }

            if (vehicle != null) {
              dataStorage.updateVehicle(vehicle.id, draft);
              navigate(`/dashboard/${vehicle.id}`);
            } else {
              const newId = crypto.randomUUID();

              dataStorage.addVehicle({
                ...draft,
                id: newId,
                taskItems: [],
                maintenanceItems: [],
              });

              navigate(`/dashboard/${newId}`);
            }
          }}
        >
          {vehicle != null ? "Save Changes" : "Save Vehicle"}
        </Button>

        {vehicle != null && (
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              const confirmed = await confirmPopup(
                `Are you sure you want to delete "${vehicle.nickname}"? This cannot be undone.`,
              );

              if (confirmed) {
                dataStorage.removeVehicle(vehicle.id);
                navigate("/dashboard");
              }
            }}
          >
            Delete Vehicle
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

export default VehicleEditForm;
