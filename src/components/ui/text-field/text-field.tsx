import { ChangeEventHandler, FC } from "react";

interface Props {
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

export const TextField: FC<Props> = ({
  name,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <div className={"flex " + className}>
      <label htmlFor={name} className="mr-2 translate-y-1">
        {name}
      </label>
      <input
        type="text"
        onChange={onChange}
        className="border rounded w-full p-1"
        id={name}
        placeholder={placeholder}
      />
    </div>
  );
};
