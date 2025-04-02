import classNames from "classnames";
import style from "./style.module.scss";
import useMountAnimation from "@/hooks/useMountAnimation";

type ScrimProps = {
  opacity?: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  children?: React.ReactNode;
};

const Scrim = (props: ScrimProps) => {
  const { isUnmounting, handleAnimationEnd } = useMountAnimation();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) return;
    props.onClick?.(event);
  };

  return (
    <div
      className={classNames(style.scrim, props.className, {
        [style.unmounting]: isUnmounting,
      })}
      style={{
        backgroundColor: `rgba(0, 0, 0, ${props.opacity ?? 0.5})`,
      }}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      {props.children}
    </div>
  );
};

export default Scrim;
