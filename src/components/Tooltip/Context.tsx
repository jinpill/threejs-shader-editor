import { createContext, useState, useContext } from "react";

export type TooltipContextState = {
  data: TooltipData | null;
  setData: (data: TooltipData | null) => void;
};

export type TooltipData = {
  contents: string;
  rect: DOMRect;
};

export const TooltipContext = createContext<TooltipContextState>({
  data: null,
  setData: () => {},
});

export const useInitContext = () => {
  const [data, setData] = useState<TooltipData | null>(null);
  return { data, setData };
};

export const useTooltipContext = () => {
  return useContext(TooltipContext);
};
