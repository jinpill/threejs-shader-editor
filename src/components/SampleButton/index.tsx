import classNames from "classnames";
import style from "./style.module.scss";

type SampleButtonProps = {
  size: "small" | "medium" | "large";
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SampleButton = (props: SampleButtonProps) => {
  return (
    <button className={classNames(style.sampleButton, style[props.size])} onClick={props.onClick}>
      {props.children}
      <div />
    </button>
  );
};

export default SampleButton;
