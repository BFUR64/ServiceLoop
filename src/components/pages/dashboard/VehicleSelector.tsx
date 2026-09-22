import { IconCirclePlus } from "@tabler/icons-react";
import type { ServiceData } from "../../../utils/FileHandler";
import "./VehicleSelector.scss";
import { useNavigate } from "react-router-dom";

interface VehicleSelectorProp {
  vehicleId: string | undefined;
  serviceData: ServiceData;
}

function VehicleSelector({ vehicleId, serviceData }: VehicleSelectorProp) {
  const navigate = useNavigate();

  return (
    <div className="vehicle-selector">
      <select
        value={vehicleId ?? ""}
        className="vehicle-selector__options"
        onChange={(event) => navigate(`/dashboard/${event.target.value}`)}
      >
        <option value="">Select a vehicle</option>
        {serviceData.vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.nickname}
          </option>
        ))}
      </select>

      <button
        className="vehicle-selector__action"
        onClick={() => navigate(`/vehicle`)}
      >
        <IconCirclePlus />
      </button>
    </div>
  );
}

export default VehicleSelector;
