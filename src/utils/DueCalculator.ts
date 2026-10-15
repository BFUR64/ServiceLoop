import type { IntervalTime } from "../models/ServiceData";
import { convertMsToDay, convertToDay } from "./TimeCalculator";

interface CalculationProp {
  dateServiced: string;
  mileageServiced: number;
  intervalKm: number | null;
  intervalTime: IntervalTime;
  currentOdometer: number;
}

export default function calculateDue({
  dateServiced,
  mileageServiced,
  intervalKm,
  intervalTime,
  currentOdometer,
}: CalculationProp) {
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
