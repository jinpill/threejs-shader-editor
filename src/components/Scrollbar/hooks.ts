import { useRef, useState } from "react";

export const useIsHover = () => {
  const [isHover, setIsHover] = useState(false);
  const timeoutIdRef = useRef<number | null>(null);

  const handlePointerEnter = () => {
    setIsHover(true);

    if (timeoutIdRef.current === null) return;
    window.clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = null;
  };

  const handlePointerLeave = () => {
    timeoutIdRef.current = window.setTimeout(() => {
      setIsHover(false);
      timeoutIdRef.current = null;
    }, 1000);
  };

  return {
    isHover,
    handlePointerEnter,
    handlePointerLeave,
  };
};
