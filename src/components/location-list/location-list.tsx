import { useEffect, useMemo, useState } from "react";
import {
  ExtendedLocation,
  useLocationsStore,
} from "../../store/useLocationsStore.ts";
import { LocationItem } from "../location-item";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";
import { generateRandomId } from "../../utils/generate-random-id.ts";

export const LocationList = () => {
  const store = useLocationsStore();

  const [locationsList, setLocationsList] = useState<
    Partial<ExtendedLocation>[]
  >([]);

  const result = useMemo(() => {
    return locationsList.map((location) => location.result);
  }, [locationsList]);

  const addLocationItem = (
    locationID: number,
    locationsID: number,
    environmentID: number,
    hint: string,
    title: string,
  ) => {
    setLocationsList((locationsList) => [
      ...locationsList,
      {
        locationID,
        name: title,
        result: {
          locationID: locationsID,
          environmentID,
          hint,
        },
      },
    ]);
  };

  const editLocationItem = (
    locationID: number,
    locationsID: number,
    environmentID: number,
    hint: string,
    title: string,
  ) => {
    setLocationsList((prevLocationsList) =>
      prevLocationsList.map((location) =>
        location.locationID === locationID
          ? {
              ...location,
              name: title,
              result: {
                locationID: locationsID,
                environmentID,
                hint,
              },
            }
          : location,
      ),
    );
  };

  const deleteLocationItem = (locationID: number) => {
    const filtredLocationsList = locationsList.filter(
      (location) => location.locationID !== locationID,
    );

    setLocationsList(filtredLocationsList);
  };

  const showResult = () => {
    console.log(result);
  };

  useEffect(() => {
    store.fetch();
  }, []);

  useEffect(() => {
    if (store.isLoaded) {
      const id = generateRandomId(1, 1000);

      addLocationItem(
        id,
        store.locations[0].locationID,
        store.environments[0].environmentID,
        "",
        `Тестовая локация ${id}`,
      );
    }
  }, [store.isLoaded]);

  return (
    <div className="mx-auto">
      <Loader isLoaded={store.isLoaded}>
        {locationsList.map((location, index) => (
          <LocationItem
            key={`location-${index}`}
            id={location.locationID as number}
            title={location.name as string}
            store={store}
            editItem={editLocationItem}
            deleteItem={deleteLocationItem}
          />
        ))}
        <div className="flex mt-1">
          <Button
            className="mr-2 border-emerald-300 text-emerald-500"
            onClick={showResult}
            name="Показать результат"
          />
          <Button
            onClick={() => {
              const id = generateRandomId(1, 1000);
              addLocationItem(
                id,
                store.locations[0].locationID,
                store.environments[0].environmentID,
                "",
                `Тестовая локация ${id}`,
              );
            }}
            name="Добавить тестовую локацию"
            className="border-blue-300 text-blue-500"
          />
        </div>
      </Loader>
    </div>
  );
};
