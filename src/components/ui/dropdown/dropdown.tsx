import { ChangeEventHandler, FC } from "react";
import { Environment, Location } from "../../../store/useLocationsStore.ts";

interface Props {
  name: string;
  options: Environment[] | Location[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
}

export const Dropdown: FC<Props> = ({ name, options, className, onChange }) => {
  return (
    <div className={"flex " + className}>
      <label className="mr-2">{name}</label>
      <select name={name} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
