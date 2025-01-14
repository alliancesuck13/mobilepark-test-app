import { FC, ReactNode } from "react";

interface Props {
  isLoaded: boolean;
  children: ReactNode;
}

export const Loader: FC<Props> = ({ isLoaded, children }) => {
  return !isLoaded ? (
    <div className="w-full">
      <div className="flex">
        <div className="mx-auto">Загрузка...</div>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};
