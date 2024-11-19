import { useEffect, useRef, useState } from "react";
import useStateRef from "@/hooks/useStateRef";

export type UseDragAndDrop<E extends HTMLElement> = (
  onDrop: DropEventHandler,
) => UseDragAndDropReturn<E>;
export type DropEventHandler = (files: File[], event: DragEvent) => void;
export type UseDragAndDropReturn<E extends HTMLElement> = {
  ref: React.RefObject<E>;
  dragging: boolean;
};

const useDragAndDrop = <E extends HTMLElement>(onDrop: DropEventHandler) => {
  const elementRef = useRef<E>(null);
  const [dragging, setDragging] = useState(false);
  const onDropRef = useStateRef(onDrop);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleDragEnter = () => {
      setDragging(true);
    };

    const handleDragLeave = () => {
      setDragging(false);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setDragging(false);

      const files = Array.from(e.dataTransfer?.files ?? []);
      if (files.length > 0) onDropRef.current(files, e);
    };

    element.addEventListener("dragenter", handleDragEnter);
    element.addEventListener("dragleave", handleDragLeave);
    element.addEventListener("dragover", handleDragOver);
    element.addEventListener("drop", handleDrop);

    return () => {
      element.removeEventListener("dragenter", handleDragEnter);
      element.removeEventListener("dragleave", handleDragLeave);
      element.removeEventListener("dragover", handleDragOver);
      element.removeEventListener("drop", handleDrop);
    };
  }, [onDropRef]);

  return {
    ref: elementRef,
    dragging,
  };
};

export default useDragAndDrop;
