import React from "react";
import { TooltipContext, useInitContext } from "../Context";

const TooltipProvider = (props: React.PropsWithChildren) => {
  const context = useInitContext();
  return (
    <TooltipContext.Provider value={context}>{props.children}</TooltipContext.Provider>
  );
};

export default TooltipProvider;
