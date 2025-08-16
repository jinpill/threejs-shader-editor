import { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";

import Scrim from "@/components/Scrim";
import Scrollbar from "@/components/Scrollbar";
import Icon from "@/components/Icon";

import useMountAnimation from "@/hooks/useMountAnimation";
import { useOptionsStore } from "@/stores/useOptionsStore";

import style from "../style.module.scss";

const Contents = () => {
  const scrimRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { getOptions, setOptions } = useOptionsStore();
  const [styles, setStyles] = useState<React.CSSProperties>({});
  const { isUnmounting, handleAnimationEnd } = useMountAnimation();
  const options = useMemo(() => getOptions()!, [getOptions]);

  useEffect(() => {
    const $scrim = scrimRef.current;
    const scrimRect = $scrim?.getBoundingClientRect();
    if (!scrimRect) {
      setStyles({});
      return;
    }

    const rect = options.rect;
    const width = rect.width;
    const top = rect.top - scrimRect.top + rect.height;
    const left = rect.left - scrimRect.left;

    setStyles({
      width,
      top,
      left,
    });
  }, [options]);

  useEffect(() => {
    const $list = listRef.current;
    if (!$list) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.target.clientHeight;
        setStyles((prev) => ({
          ...prev,
          height,
        }));
      }
    });

    observer.observe($list);
    return () => observer.disconnect();
  }, []);

  return (
    <Scrim ref={scrimRef} opacity={0} onClick={() => setOptions(null)}>
      <Scrollbar
        className={classNames(style.options, {
          [style.unmounting]: isUnmounting,
        })}
        style={styles}
        onAnimationEnd={handleAnimationEnd}
      >
        <ul ref={listRef} className={style.list}>
          {options.list.map((option) => (
            <li
              key={option.value}
              className={style.item}
              onClick={() => {
                options.callback(option.value);
                setOptions(null);
              }}
            >
              <span>{option.label}</span>
              {option.value === options.value && (
                <Icon className={style.checkIcon} icon="check" />
              )}
            </li>
          ))}
        </ul>
      </Scrollbar>
    </Scrim>
  );
};

export default Contents;
