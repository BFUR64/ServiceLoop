import { IconMessage } from "@tabler/icons-react";
import { updateVehicle } from "../../../state/DataStorage";
import type { VehicleData } from "../../../utils/FileHandler";
import "./VehicleCard.scss";
import { useNavigate } from "react-router-dom";

interface VehicleProp {
  vehicleId: string | undefined;
  vehicleSelected: VehicleData | undefined;
}

function VehicleCard({ vehicleId, vehicleSelected }: VehicleProp) {
  const navigate = useNavigate();

  if (vehicleId == undefined || vehicleSelected == undefined) {
    return <div className="vehicle-card">Select or add a new vehicle</div>;
  }

  return (
    <div className="vehicle-card">
      <div className="vehicle-card__info">
        <div>{vehicleSelected.nickname}</div>
        <div>
          {(vehicleSelected.make ?? "--") +
            " " +
            (vehicleSelected.model ?? "") +
            " " +
            (vehicleSelected.trim ?? "")}
        </div>
        <div>
          {(vehicleSelected.engine ?? "--") +
            " | " +
            (vehicleSelected.year ?? "--")}
        </div>
        <div>
          <input
            type="text"
            value={vehicleSelected.currentOdometer}
            onChange={(event) => {
              const value = Number(event.target.value);

              if (Number.isFinite(value)) {
                updateVehicle(vehicleId, { currentOdometer: value });
              }
            }}
          />{" "}
          km
        </div>
      </div>
      <div className="vehicle-card__actions">
        <button
          className="vehicle-card__action vehicle-card__action--edit"
          onClick={() => navigate(`/vehicle/${vehicleId}`)}
        >
          Edit
        </button>

        <button className="vehicle-card__action">
          <IconMessage />
        </button>
      </div>
    </div>
  );
}

export default VehicleCard;
