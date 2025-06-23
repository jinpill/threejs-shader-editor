import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import StatusIcon, { type IconStatus } from "@/components/StatusIcon";
import Button, { type ButtonType } from "@/components/Button";
import Icon, { type IconName } from "@/components/Icon";
import style from "./style.module.scss";
import { useToastStore } from "@/stores/useToastStore";
import useStateRef from "@/hooks/useStateRef";

export type ToastProps = {
  id: number;
  status: ToastStatus;
  title: string;
  subTitle?: string;
  message: string;
  details?: string;
  buttons?: ToastButton[];
  duration: number | null;
  onTimeout: (id: number) => void;
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
  const onTimeoutRef = useStateRef(props.onTimeout);

  const [height, setHeight] = useState("auto");
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const { addIdsToRemove } = useToastStore();

  const lastTimeRef = useRef(Date.now());
  const spentTimeRef = useRef(0);
  const isHoverRef = useRef(false);
  const [spentTimeWidth, setSpentTimeWidth] = useState("0%");

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

  useEffect(() => {
    const duration = props.duration;
    if (duration === null) return;

    let id: number | null = null;
    const animate = () => {
      id = requestAnimationFrame(() => {
        if (isHoverRef.current) {
          lastTimeRef.current = Date.now();
          animate();
        } else {
          spentTimeRef.current += Date.now() - lastTimeRef.current;
          const percentage = (spentTimeRef.current / duration) * 100;
          lastTimeRef.current = Date.now();

          if (percentage > 100) {
            setSpentTimeWidth("100%");
            onTimeoutRef.current(props.id);
          } else {
            setSpentTimeWidth(`${percentage}%`);
            animate();
          }
        }
      });
    };

    animate();
    return () => {
      if (id === null) return;
      cancelAnimationFrame(id);
    };
  }, [props.duration, props.id, onTimeoutRef]);

  return (
    <div
      className={classNames(style.toast, style[props.status])}
      onPointerEnter={() => (isHoverRef.current = true)}
      onPointerLeave={() => (isHoverRef.current = false)}
    >
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

      {props.duration !== null && (
        <div className={style.spentTime}>
          <div style={{ width: spentTimeWidth }} />
        </div>
      )}
    </div>
  );
};

export default Toast;
