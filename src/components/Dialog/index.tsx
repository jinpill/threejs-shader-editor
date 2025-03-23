import classNames from "classnames";
import Scrim from "@/components/Scrim";
import useMountAnimation from "@/hooks/useMountAnimation";
import style from "./style.module.scss";

type DialogProps = {
  onClickAway?: () => void;
};

const Dialog = (props: DialogProps) => {
  const { isUnmounting, handleAnimationEnd } = useMountAnimation();

  return (
    <Scrim onClick={props.onClickAway}>
      <div
        className={classNames(style.dialog, {
          [style.unmounting]: isUnmounting,
        })}
        onTransitionEnd={handleAnimationEnd}
      ></div>
    </Scrim>
  );
};

export default Dialog;
