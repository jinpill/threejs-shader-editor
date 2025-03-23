import React from "react";

export type ContextType = {
  state: State;
  unmount: () => void;
};

export type State = "mounted" | "unmounting" | "unmounted";

const Context = React.createContext<ContextType>({
  state: "mounted",
  unmount: () => {},
});

export default Context;
