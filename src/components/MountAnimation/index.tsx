import { useCallback, useEffect, useState } from "react";
import Context, { State } from "./context";
import useStateRef from "@/hooks/useStateRef";

type MountAnimationProps = {
  isVisible: boolean;
  onMounted?: () => void;
  onUnmounting?: () => void;
  onUnmounted?: () => void;
  children?: React.ReactNode;
};

const MountAnimation = (props: MountAnimationProps) => {
  const onMountedRef = useStateRef(props.onMounted);
  const onUnmountingRef = useStateRef(props.onUnmounting);
  const onUnmountedRef = useStateRef(props.onUnmounted);

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

  useEffect(() => {
    if (state === "mounted") {
      window.setTimeout(() => {
        onMountedRef.current?.();
      }, 0);
    } else if (state === "unmounting") {
      window.setTimeout(() => {
        onUnmountingRef.current?.();
      }, 0);
    } else {
      window.setTimeout(() => {
        onUnmountedRef.current?.();
      }, 0);
    }
  }, [state, onMountedRef, onUnmountingRef, onUnmountedRef]);

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
