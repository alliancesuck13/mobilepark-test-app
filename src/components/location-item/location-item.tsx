import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { Dropdown } from "../ui/dropdown";
import { TextField } from "../ui/text-field";
import { LocationsStore } from "../../store/useLocationsStore.ts";
import { findId, TArray } from "../../utils/find-id.ts";
import { Label } from "../ui/label";
import svg from "../../app/vial.svg";
import trash from "../../app/trash.svg";

interface Props {
  title: string;
  id: number;
  store: LocationsStore;
  editItem: (
    locationID: number,
    locationsID: number,
    environmentID: number,
    hint: string,
    title: string,
  ) => void;
  deleteItem: (id: number) => void;
}

export const LocationItem: FC<Props> = ({
  title = "Тестовая локация",
  id,
  store,
  editItem,
  deleteItem,
}) => {
  const [hint, setHint] = useState<string>("");
  const [locationID, setLocationID] = useState<number>(-1);
  const [environmentID, setEnvironmentID] = useState<number>(-1);

  useEffect(() => {
    if (store.isLoaded) {
      editItem(id, locationID, environmentID, hint, title);
    }
  }, [hint, locationID, environmentID]);

  useEffect(() => {
    if (store.isLoaded) {
      setLocationID(store.locations[0].locationID);
      setEnvironmentID(store.environments[0].environmentID);
    }
  }, [store.isLoaded]);

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHint(event.target.value);
  };

  const handleLocationDropdownChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const id = findId(
      event.target.value,
      store.locations as TArray,
      "Location",
    );

    setLocationID(id);
  };

  const handleEnvironmentDropdownChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const id = findId(
      event.target.value,
      store.environments as TArray,
      "Environment",
    );

    setEnvironmentID(id);
  };

  const servers: string[] = useMemo(() => {
    return store?.servers?.map((server) => server.name);
  }, [store.servers]);

  return (
    <div className="w-auto border-2 px-2 py-1 mb-1 rounded relative">
      <>
        <h2 className="text-lg font-bold flex">
          <img src={svg} alt="" width="25px" className="mr-2" />
          {title}
        </h2>
        <div className="flex">
          <Dropdown
            className="mr-2"
            name="Локация"
            options={store.locations}
            onChange={handleLocationDropdownChange}
          />
          <Dropdown
            className="mr-2"
            name="Среда"
            options={store.environments}
            onChange={handleEnvironmentDropdownChange}
          />
          <Label name="Серверы" label={servers} />
        </div>
        <div className="mt-3">
          <TextField
            name="Подсказка"
            placeholder="Комментарий по локации"
            onChange={handleTextFieldChange}
          />
        </div>
      </>
      <img
        src={trash}
        alt=""
        width="15px"
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => deleteItem(id)}
      />
    </div>
  );
};
