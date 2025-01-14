import { FC } from "react";
import { returnString } from "../../../utils/return-string.ts";

interface Props {
  name: string;
  label?: string | string[];
  className?: string;
}

export const Label: FC<Props> = ({ name, label, className }) => {
  return (
    <div className={"flex " + className}>
      <label className="mr-2">{name}</label>
      <span className="font-semibold">{returnString(label)}</span>
    </div>
  );
};
