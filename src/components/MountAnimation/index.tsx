import { useCallback, useEffect, useState } from "react";
import Context, { State } from "./context";

type MountAnimationProps = {
  isVisible: boolean;
  children?: React.ReactNode;
};

const MountAnimation = (props: MountAnimationProps) => {
  const [state, setState] = useState<State>(() => {
    return props.isVisible ? "mounted" : "unmounted";
  });

  const unmount = useCallback(() => {
    setState("unmounted");
  }, []);

  useEffect(() => {
    if (!props.isVisible) return;

    setState("mounted");
    return () => setState("unmounting");
  }, [props.isVisible]);

  return (
    <Context.Provider
      value={{
        state,
        unmount,
      }}
    >
      {state !== "unmounted" && props.children}
    </Context.Provider>
  );
};

export default MountAnimation;
