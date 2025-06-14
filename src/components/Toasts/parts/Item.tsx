import { useEffect, useRef, useState } from "react";
import style from "../style.module.scss";

type ItemProps = {
  index: number;
  isDisappearing: boolean;
  onDisappear: (index: number) => void;
  children?: React.ReactNode;
};

const Item = (props: ItemProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  const handleTransitionEnd = () => {
    if (!props.isDisappearing) return;
    props.onDisappear(props.index);
  };

  useEffect(() => {
    const $wrapper = wrapperRef.current;
    if (!$wrapper) return;

    const rect = $wrapper.getBoundingClientRect();
    const height = `${rect.height}px`;
    setHeight(height);
  }, []);

  useEffect(() => {
    if (!props.isDisappearing) return;
    setHeight("0px");
  }, [props.isDisappearing]);

  return (
    <li style={{ height }} className={style.item} onTransitionEnd={handleTransitionEnd}>
      <div ref={wrapperRef} className={style.itemWrapper}>
        <div>{props.children}</div>
      </div>
    </li>
  );
};

export default Item;
