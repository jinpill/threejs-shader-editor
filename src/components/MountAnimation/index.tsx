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
    window.setTimeout(() => {
      onUnmountedRef.current?.();
    }, 0);
  }, [onUnmountedRef]);

  useEffect(() => {
    if (!props.isVisible) return;

    setState("mounted");
    window.setTimeout(() => {
      onMountedRef.current?.();
    }, 0);

    return () => {
      setState("unmounting");
      // eslint-disable-next-line
      onUnmountingRef.current?.();
    };
  }, [props.isVisible, onMountedRef, onUnmountingRef]);

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
