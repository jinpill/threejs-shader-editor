import { createContext, useContext } from "react";

export type CommonSizeContextType = {
  size?: CommonSize;
};

export type CommonSize = "small" | "large";

export const CommonSizeContext = createContext<CommonSizeContextType>({});

const useCommonSize = (size?: CommonSize) => {
  const context = useContext(CommonSizeContext);
  return size ?? context.size ?? "small";
};

export default useCommonSize;
