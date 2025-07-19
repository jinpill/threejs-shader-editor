import React, { useRef, useState } from "react";

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

export const useDragScrollbar = (
  contentsRef: React.RefObject<HTMLDivElement>,
  thumbRef: React.RefObject<HTMLDivElement>,
  onUpdateScrollTop: () => void,
) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handlePointerDown = (event: React.PointerEvent) => {
    const $contents = contentsRef.current;
    const $thumb = thumbRef.current;
    if (!$contents || !$thumb) return;

    event.preventDefault();
    setIsScrolling(true);

    const handlePointerMove = (event: PointerEvent) => {
      event.preventDefault();

      const contentsRect = $contents.getBoundingClientRect();
      const thumbRect = $thumb.getBoundingClientRect();

      const scrollHeight = $contents.scrollHeight;
      const contentsHeight = contentsRect.height;
      const thumbHeight = thumbRect.height;

      const scrollSpaceHeight = scrollHeight - contentsHeight;
      const scrollbarSpaceHeight = contentsHeight - thumbHeight;
      const movementRatio = event.movementY / scrollbarSpaceHeight;

      $contents.scrollTop = $contents.scrollTop + scrollSpaceHeight * movementRatio;
      onUpdateScrollTop();
    };

    const handlePointerUp = () => {
      setIsScrolling(false);

      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  };

  return {
    isScrolling,
    handlePointerDown,
  };
};
