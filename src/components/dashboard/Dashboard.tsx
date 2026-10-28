import { useServiceData } from "@/hooks/use-service-data";
import {
  IntervalTime,
  MaintenanceItem,
  TaskItem,
  VehicleData,
} from "@/models/service-data";
import { convertMsToDay, convertToDay } from "@/utils/time-calculator";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Divider, Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AddItemButton from "./AddItemButton";
import AddVehicleButton from "./AddVehicleButton";
import VehicleInformation from "./VehicleInformation";
import VehicleSelector from "./VehicleSelector";
import { TaskCard } from "./item-card/TaskCard";

export default function Dashboard() {
  const serviceData = useServiceData();

  const [vehicleId, setVehicleId] = useState<string | undefined>(undefined);

  const [vehicle, setVehicle] = useState<VehicleData | undefined>(undefined);

  useEffect(() => {
    setVehicle(
      serviceData.vehicles.find((vehicle) => vehicle.id === vehicleId),
    );
  }, [vehicleId]);

  const sortedTaskItems = sortTaskItems(vehicle);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Surface style={{ flex: 1, padding: 16, gap: 8 }}>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <VehicleSelector
              serviceData={serviceData}
              vehicle={vehicle}
              setVehicleId={setVehicleId}
            />
            <AddVehicleButton />
          </View>
          <VehicleInformation vehicleId={vehicleId} vehicle={vehicle} />
          <AddItemButton vehicleId={vehicleId} />
        </View>
        {vehicleId != null && vehicle != null && (
          <>
            <Divider />
            <ScrollView>
              <View style={{ gap: 16 }}>
                <Text>Task</Text>
                {sortedTaskItems?.map((item) => (
                  <TaskCard
                    key={item.id}
                    vehicleId={vehicleId}
                    currentOdometer={vehicle.currentOdometer}
                    itemId={item.id}
                    itemName={item.name}
                    itemNote={item.note}
                    priority={item.priority}
                  />
                ))}
              </View>
            </ScrollView>
          </>
        )}
      </Surface>
    </SafeAreaView>
  );
}

function sortMaintenanceItems(
  vehicle: VehicleData | undefined,
): { item: MaintenanceItem; due: number }[] | undefined {
  return vehicle?.maintenanceItems
    .map((item) => ({
      item,
      due: calculateDue({
        ...item,
        currentOdometer: vehicle.currentOdometer,
      }),
    }))
    .sort((a, b) => {
      const priorityDiff = Number(b.item.priority) - Number(a.item.priority);

      if (priorityDiff !== 0) return priorityDiff;

      const dueDiff = a.due - b.due;

      if (dueDiff !== 0) return dueDiff;

      return a.item.name.localeCompare(b.item.name);
    });
}

function sortTaskItems(
  vehicle: VehicleData | undefined,
): TaskItem[] | undefined {
  return vehicle?.taskItems
    ? [...vehicle.taskItems].sort(
        (a, b) => Number(b.priority) - Number(a.priority),
      )
    : undefined;
}

interface CalculateDueProp {
  dateServiced: string;
  mileageServiced: number;
  intervalKm: number | null;
  intervalTime: IntervalTime;
  currentOdometer: number;
}

function calculateDue({
  dateServiced,
  mileageServiced,
  intervalKm,
  intervalTime,
  currentOdometer,
}: CalculateDueProp) {
  const ratios: number[] = [];

  // Distance-based progress
  if (intervalKm !== null && intervalKm > 0) {
    const kmSince = currentOdometer - mileageServiced;
    ratios.push(kmSince / intervalKm);
  }

  // Time-based progress
  if (intervalTime.value !== null && intervalTime.value > 0) {
    const intervalDays = convertToDay(intervalTime.unit, intervalTime.value);
    const daysSince = convertMsToDay(
      Date.now() - new Date(dateServiced).getTime(),
    );
    ratios.push(daysSince / intervalDays);
  }

  // No maintenance interval configured
  if (ratios.length === 0) return 100;

  // Worst-case = whichever is furthest along
  const worst = Math.max(...ratios);

  // Flip to countdown: 100 = healthy, 0 = due, then clamp
  return Math.min(100, Math.max(0, (1 - worst) * 100));
}
