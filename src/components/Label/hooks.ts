import { createContext, useContext } from "react";

export type LabelGroupContextType = {
  width?: number;
  updateWidth?: (id: string, width: number) => void;
  disconnect?: (id: string) => void;
};

export const LabelGroupContext = createContext<LabelGroupContextType>({});

export const useLabelGroupContext = () => {
  return useContext(LabelGroupContext);
};
