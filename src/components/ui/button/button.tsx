import { FC } from "react";

interface Props {
  className?: string;
  onClick?: () => void;
  name: string;
}

export const Button: FC<Props> = ({ onClick, name, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={"border-2 py-1 px-3 rounded " + className}
    >
      {name}
    </button>
  );
};
