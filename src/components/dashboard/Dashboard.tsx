import { useServiceData } from "@/hooks/use-service-data";
import { VehicleData } from "@/models/service-data";
import { useEffect, useState } from "react";
import { Surface } from "react-native-paper";
import VehicleSelector from "./VehicleSelector";

export default function Dashboard() {
  const serviceData = useServiceData();

  const [vehicleId, setVehicleId] = useState<string | null>(null);

  const [vehicle, setVehicle] = useState<VehicleData | undefined>(undefined);

  useEffect(() => {
    setVehicle(
      serviceData.vehicles.find((vehicle) => vehicle.id === vehicleId),
    );
  }, [vehicleId]);

  return (
    <Surface style={{ flex: 1, padding: "1rem" }}>
      <VehicleSelector
        serviceData={serviceData}
        vehicle={vehicle}
        setVehicleId={setVehicleId}
      />
    </Surface>
  );
}
