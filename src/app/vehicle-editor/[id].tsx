import VehicleEditor from "@/components/vehicle-editor/VehicleEditor";
import { useLocalSearchParams } from "expo-router";

export default function VehiclePage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <VehicleEditor vehicleId={id} />;
}
