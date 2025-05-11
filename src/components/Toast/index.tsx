import { useState } from "react";
import StatusIcon, { type IconStatus } from "@/components/StatusIcon";
import Button, { type ButtonType } from "@/components/Button";
import Icon, { type IconName } from "@/components/Icon";
import style from "./style.module.scss";

export type ToastProps = {
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
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

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
          {props.details && !isDetailsVisible && (
            <button
              className={style.showDetailsButton}
              tabIndex={-1}
              onClick={() => setIsDetailsVisible(true)}
            >
              Show details
            </button>
          )}
          {props.details && isDetailsVisible && (
            <div className={style.details}>{props.details}</div>
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

        <button className={style.closeButton} tabIndex={-1}>
          <Icon icon="close" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
