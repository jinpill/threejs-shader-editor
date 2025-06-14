import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import StatusIcon, { type IconStatus } from "@/components/StatusIcon";
import Button, { type ButtonType } from "@/components/Button";
import Icon, { type IconName } from "@/components/Icon";
import style from "./style.module.scss";
import { useToastStore } from "@/stores/useToastStore";

export type ToastProps = {
  id: number;
  status: ToastStatus;
  title: string;
  subTitle?: string;
  message: string;
  details?: string;
  buttons?: ToastButton[];
};

export type ToastStatus = IconStatus;

export type ToastButton = {
  icon: IconName;
  label: string;
  type: ButtonType;
  onClick: () => void;
};

const Toast = (props: ToastProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("auto");
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const { addIdsToRemove } = useToastStore();

  const handleClose = () => {
    addIdsToRemove(props.id);
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

  return (
    <div className={style.toast}>
      <StatusIcon className={style.statusIcon} status={props.status} />

      <div className={style.contents}>
        <div className={style.title}>
          {props.title}
          {props.subTitle && <span className={style.subTitle}>{props.subTitle}</span>}
        </div>
        <div className={style.message}>
          {props.message}

          {props.details && (
            <div style={{ height }} className={style.details}>
              <div
                ref={wrapperRef}
                className={classNames(style.detailsWrapper, {
                  [style.hidden]: !isDetailsVisible,
                })}
              >
                <div>{props.details}</div>
              </div>
            </div>
          )}

          {props.details && (
            <button
              className={style.showDetailsButton}
              tabIndex={-1}
              onClick={() => setIsDetailsVisible(!isDetailsVisible)}
            >
              {isDetailsVisible ? "Hide details" : "Show details"}
            </button>
          )}

          {props.buttons && props.buttons.length > 0 && (
            <div className={style.buttons}>
              {props.buttons.map((button, i) => (
                <Button
                  key={i}
                  type={button.type}
                  label={button.label}
                  icon={button.icon}
                  onClick={button.onClick}
                />
              ))}
            </div>
          )}
        </div>

        <button className={style.closeButton} tabIndex={-1} onClick={handleClose}>
          <Icon icon="close" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
