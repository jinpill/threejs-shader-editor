import { useEffect, useRef, useState } from "react";
import style from "../style.module.scss";
import { useToastStore } from "@/stores/useToastStore";
import classNames from "classnames";

type ItemProps = {
  id: number;
  isDisappearing: boolean;
  children?: React.ReactNode;
};

const Item = (props: ItemProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");
  const { removeToast } = useToastStore();

  const handleTransitionEnd = () => {
    if (!props.isDisappearing) return;
    removeToast(props.id);
  };

  useEffect(() => {
    const $wrapper = wrapperRef.current;
    if (!$wrapper) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();
        const height = `${rect.height}px`;
        setHeight(height);
      }
    });

    observer.observe($wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!props.isDisappearing) return;
    setHeight("0px");
  }, [props.isDisappearing]);

  return (
    <li
      style={{ height }}
      className={classNames(style.item, {
        [style.disappearing]: props.isDisappearing,
      })}
      onTransitionEnd={handleTransitionEnd}
    >
      <div ref={wrapperRef} className={style.itemWrapper}>
        <div>{props.children}</div>
      </div>
    </li>
  );
};

export default Item;
