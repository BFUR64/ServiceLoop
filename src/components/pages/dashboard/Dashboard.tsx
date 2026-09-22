import { useServiceData } from "../../../hooks/DataHook";
import VehicleCard from "./VehicleCard";
import VehicleSelector from "./VehicleSelector";
import "./Dashboard.scss";
import { useParams } from "react-router-dom";
import TaskCard from "../../items/TaskCard";
import MaintenanceCard from "../../items/MaintenanceCard";

export function Dashboard() {
  const serviceData = useServiceData();

  const { vehicleId } = useParams();

  const vehicleSelected = serviceData.vehicles.find(
    (vehicle) => vehicle.id === vehicleId,
  );

  return (
    <>
      <div className="dashboard__vehicle">
        <VehicleSelector vehicleId={vehicleId} serviceData={serviceData} />
        <VehicleCard vehicleId={vehicleId} vehicleSelected={vehicleSelected} />
      </div>

      {vehicleId == undefined || vehicleSelected == undefined ? null : (
        <>
          <div className="dashboard__actions">
            <h3>Upcoming Work</h3>
            <button className="dashboard__action">Add Item</button>
          </div>

          <div className="dashboard__items">
            <h3>Task</h3>
            <div className="dashboard__tasks">
              {vehicleSelected.taskItems.map((item) => (
                <TaskCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  priority={item.priority}
                />
              ))}
            </div>
            <h3>Maintenance</h3>
            <div className="dashboard__maintenances">
              {vehicleSelected.maintenanceItems.map((item) => (
                <MaintenanceCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  dateServiced={item.dateServiced}
                  mileageServiced={item.mileageServiced}
                  intervalKm={item.intervalKm}
                  intervalTime={item.intervalTime}
                  currentOdometer={vehicleSelected.currentOdometer}
                  priority={item.priority}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
