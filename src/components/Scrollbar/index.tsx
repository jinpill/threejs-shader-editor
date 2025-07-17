import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useIsHover } from "./hooks";
import style from "./style.module.scss";

export type ScrollbarProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const Scrollbar = (props: ScrollbarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState("0%");
  const [position, setPosition] = useState("0px");

  const [needScrollbar, setNeedScrollbar] = useState(false);
  const { isHover, handlePointerEnter, handlePointerLeave } = useIsHover();

  useEffect(() => {
    const $container = containerRef.current;
    const $contents = contentsRef.current;
    const $thumb = thumbRef.current;
    if (!$container || !$contents || !$thumb) return;

    const handleWheel = (event: WheelEvent) => {
      $contents.scrollTop += event.deltaY;

      const containerRect = $container.getBoundingClientRect();
      const thumbRect = $thumb.getBoundingClientRect();

      const percentage =
        $contents.scrollTop / ($contents.scrollHeight - containerRect.height);
      const freeSpaace = containerRect.height - thumbRect.height;
      setPosition(`${percentage * freeSpaace}px`);

      event.preventDefault();
      event.stopPropagation();
    };

    $container.addEventListener("wheel", handleWheel, { passive: false });
    return () => $container.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const $contents = contentsRef.current;
    if (!$contents) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();
        const height = (rect.height / entry.target.scrollHeight) * 100 + "%";
        const needScrollbar = rect.height < entry.target.scrollHeight;

        setHeight(height);
        setNeedScrollbar(needScrollbar);
      }
    });

    observer.observe($contents);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={classNames(style.scrollbar, props.className)}
      style={props.style}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div ref={contentsRef} className={style.contents}>
        {props.children}
      </div>

      <div
        className={classNames(style.track, {
          [style.hidden]: !needScrollbar || !isHover,
        })}
      >
        <div
          ref={thumbRef}
          className={style.thumb}
          style={{
            height: height,
            top: position,
          }}
        />
      </div>
    </div>
  );
};

export default Scrollbar;
