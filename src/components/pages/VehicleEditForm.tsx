import { useNavigate, useParams } from "react-router-dom";
import { useServiceData } from "../../hooks/DataHook.ts";
import { useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import "./VehicleEditForm.scss";

import * as dataStorage from "../../state/DataStorage.ts";

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
    <div className="vehicle">
      <div className="vehicle__top">
        <button
          onClick={() =>
            vehicle != null
              ? navigate(`/dashboard/${vehicle.id}`)
              : navigate("/dashboard")
          }
        >
          <IconArrowLeft />
        </button>
      </div>

      <div className="vehicle__edit">
        <p>Name</p>
        <input
          type="text"
          value={draft.nickname}
          onChange={(event) =>
            setDraft({ ...draft, nickname: event.currentTarget.value })
          }
        />

        <p>Note</p>
        <input
          type="text"
          value={draft.note ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, note: event.currentTarget.value || null })
          }
        />

        <p>Make</p>
        <input
          type="text"
          value={draft.make ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, make: event.currentTarget.value || null })
          }
        />

        <p>Model</p>
        <input
          type="text"
          value={draft.model ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, model: event.currentTarget.value || null })
          }
        />

        <p>Trim</p>
        <input
          type="text"
          value={draft.trim ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, trim: event.currentTarget.value || null })
          }
        />

        <p>Year</p>
        <input
          type="text"
          value={draft.year ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, year: event.currentTarget.value || null })
          }
        />

        <p>Engine</p>
        <input
          type="text"
          value={draft.engine ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, engine: event.currentTarget.value || null })
          }
        />

        <p>Fuel</p>
        <input
          type="text"
          value={draft.fuel ?? ""}
          onChange={(event) =>
            setDraft({ ...draft, fuel: event.currentTarget.value || null })
          }
        />

        <p>Current Odometer</p>
        <input
          type="number"
          value={draft.currentOdometer}
          onChange={(event) =>
            setDraft({
              ...draft,
              currentOdometer: Number(event.currentTarget.value),
            })
          }
        />
      </div>
      <div className="vehicle__actions">
        {vehicle != null ? (
          <button
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
          </button>
        ) : (
          <button
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
          </button>
        )}
        {vehicle != null ? (
          <button
            onClick={() => {
              dataStorage.removeVehicle(vehicle.id);
              navigate(`/dashboard`);
            }}
          >
            Delete Vehicle
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default VehicleEditForm;
