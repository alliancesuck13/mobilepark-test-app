import { Environment, Location } from "../store/useLocationsStore.ts";

export type TArray = Location[] & Environment[];

export function findId(
  name: string,
  array: TArray,
  type: "Location" | "Environment",
): number {
  const index = array.findIndex((e) => e.name === name);

  if (type === "Location") {
    return array[index].locationID;
  }

  if (type === "Environment") {
    return array[index].environmentID;
  }

  return -1;
}
