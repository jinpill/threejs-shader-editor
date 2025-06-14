import { useState } from "react";
import classNames from "classnames";
import Item from "./parts/Item";
import { useToastStore } from "@/stores/useToastStore";
import style from "./style.module.scss";

type ToastProps = {
  className?: string;
  style?: React.CSSProperties;
};

const Toasts = (props: ToastProps) => {
  const [idsToRemove, setIdsToRemove] = useState<number[]>([]);
  const { list, addToast, removeToast } = useToastStore();

  const handleAddToast = () => {
    addToast({});
  };

  const handleRemoveToast = () => {
    const index = Math.floor(Math.random() * list.length);
    setIdsToRemove([...idsToRemove, list[index].id]);
  };

  return (
    <div style={props.style} className={classNames(style.toasts, props.className)}>
      <div className={style.buttons}>
        <button onClick={handleAddToast}>추가</button>
        <button onClick={handleRemoveToast}>제거</button>
      </div>

      <ul className={style.list}>
        {list.map((toast) => (
          <Item
            key={toast.id}
            id={toast.id}
            isDisappearing={idsToRemove.includes(toast.id)}
            onDisappear={removeToast}
          >
            안녕하세요 {toast.id}
          </Item>
        ))}
      </ul>
    </div>
  );
};

export default Toasts;
