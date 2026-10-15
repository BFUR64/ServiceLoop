import type { IntervalTime } from "../models/ServiceData";

export function convertToDay(
  unit: IntervalTime["unit"],
  value: number,
): number {
  switch (unit) {
    case "day":
      return value * 1;
    case "week":
      return value * 7;
    case "month":
      return value * 30;
    case "year":
      return value * 360;
  }
}

export function convertMsToDay(value: number) {
  return value / (1000 * 60 * 60 * 24);
}

export function convertToMs(unit: IntervalTime["unit"], value: number) {
  return convertToDay(unit, value) * 24 * 60 * 60 * 1000;
}
