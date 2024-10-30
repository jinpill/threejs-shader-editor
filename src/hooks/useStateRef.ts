import { useEffect, useRef } from "react";

const useStateRef = <T>(state: T) => {
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return stateRef;
};

export default useStateRef;
