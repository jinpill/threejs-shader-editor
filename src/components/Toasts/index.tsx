import classNames from "classnames";
import Toast from "@/components/Toast";
import Item from "./parts/Item";
import { useToastStore } from "@/stores/useToastStore";
import style from "./style.module.scss";

type ToastProps = {
  className?: string;
  style?: React.CSSProperties;
};

const Toasts = (props: ToastProps) => {
  const { list, idsToRemove, addToast, addIdsToRemove } = useToastStore();

  const handleAddToast = () => {
    addToast({
      status: "info",
      title: "우와 신기하다",
      message: "참 쉽죠?",
      duration: 3000,
    });
  };

  return (
    <div style={props.style} className={classNames(style.toasts, props.className)}>
      <div className={style.buttons}>
        <button onClick={handleAddToast}>추가</button>
      </div>

      <ul className={style.list}>
        {list.map((toast) => (
          <Item
            key={toast.id}
            id={toast.id}
            isDisappearing={idsToRemove.includes(toast.id)}
          >
            <Toast {...toast} onTimeout={addIdsToRemove} />
          </Item>
        ))}
      </ul>
    </div>
  );
};

export default Toasts;
