import { useEffect, useRef } from "react";

export type UseStateRef = <T>(state: T) => React.MutableRefObject<T>;

const useStateRef: UseStateRef = (state) => {
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return stateRef;
};

export default useStateRef;
