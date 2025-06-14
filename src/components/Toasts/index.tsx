import { useState } from "react";
import classNames from "classnames";
import Item from "./parts/Item";
import style from "./style.module.scss";

type ToastProps = {
  className?: string;
  style?: React.CSSProperties;
};

const Toasts = (props: ToastProps) => {
  const [list, setList] = useState<number[]>([]);
  const [indicesToRemove, setIndicesToRemove] = useState<number[]>([]);

  const handleAddToast = () => {
    const lastIndex = list[list.length - 1] ?? -1;
    setList([...list, lastIndex + 1]);
  };

  const handleRemoveToast = () => {
    const index = Math.floor(Math.random() * list.length);
    setIndicesToRemove([...indicesToRemove, list[index]]);
  };

  const handleDisappear = (index: number) => {
    const filter = (arr: number[]) => arr.filter((i) => i !== index);
    setIndicesToRemove((prev) => filter(prev));
    setList((prev) => filter(prev));
  };

  return (
    <div style={props.style} className={classNames(style.toasts, props.className)}>
      <div className={style.buttons}>
        <button onClick={handleAddToast}>추가</button>
        <button onClick={handleRemoveToast}>제거</button>
      </div>

      <ul className={style.list}>
        {list.map((i) => (
          <Item
            key={i}
            index={i}
            isDisappearing={indicesToRemove.includes(i)}
            onDisappear={handleDisappear}
          >
            안녕하세요 {i}
          </Item>
        ))}
      </ul>
    </div>
  );
};

export default Toasts;
