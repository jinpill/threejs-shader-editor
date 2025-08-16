import { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";

import Scrim from "@/components/Scrim";
import Scrollbar from "@/components/Scrollbar";
import Icon from "@/components/Icon";

import useMountAnimation from "@/hooks/useMountAnimation";
import { useOptionsStore, type Option } from "@/stores/useOptionsStore";

import style from "../style.module.scss";

const Contents = () => {
  const scrimRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { getOptions, setOptions } = useOptionsStore();
  const [styles, setStyles] = useState<React.CSSProperties>({});
  const { isUnmounting, handleAnimationEnd } = useMountAnimation();
  const options = useMemo(() => getOptions()!, [getOptions]);

  const getTitleAttr = (option: Option<string | number>) => {
    let title = option.label;
    if (option.description) title += ` - ${option.description}`;
    return title;
  };

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

  useEffect(() => {
    const $list = listRef.current;
    if (!$list) return;

    const index = options.list.findIndex((option) => option.value === options.value);
    const $option = $list.children[index] as HTMLElement;
    $option?.focus();
  }, [options]);

  useEffect(() => {
    const $list = listRef.current;
    const $options = Array.from($list?.children ?? []);
    if (!$list || !$options) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        return;
      }

      if (event.key === "Escape") {
        setOptions(null);
        event.preventDefault();
        return;
      }

      if (event.key === "ArrowUp") {
        const activeElement = getActiveElement();
        focusOption(activeElement, -1);
        event.preventDefault();
        return;
      }

      if (event.key === "ArrowDown") {
        const activeElement = getActiveElement();
        focusOption(activeElement, +1);
        event.preventDefault();
        return;
      }

      if (event.key === "Enter") {
        const activeElement = getActiveElement();
        activeElement?.click();
        event.preventDefault();
        return;
      }
    };

    const getActiveElement = () => {
      const activeElement = $list.querySelector(":focus");
      if (!activeElement) return null;
      return activeElement as HTMLElement;
    };

    const focusOption = (activeElement: HTMLElement | null, direction: number) => {
      const index = activeElement ? $options.indexOf(activeElement) : -1;
      const targetIndex = index === -1 ? 0 : index + direction;
      const $option = $options[targetIndex] as HTMLElement;
      $option?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setOptions]);

  return (
    <Scrim
      ref={scrimRef}
      className={style.scrim}
      opacity={0}
      onClick={() => setOptions(null)}
    >
      <Scrollbar
        className={classNames(style.options, style[options.size], {
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
              tabIndex={-1}
              title={getTitleAttr(option)}
              onClick={() => {
                options.callback(option.value);
                setOptions(null);
              }}
              onPointerEnter={(event) => {
                const $target = event.target as HTMLElement;
                $target.focus();
              }}
            >
              <div className={style.contents}>
                {option.icon && <Icon className={style.icon} icon={option.icon} />}
                <div className={style.text}>
                  <span className={style.label}>{option.label}</span>
                  {option.description && (
                    <span className={style.description}>{option.description}</span>
                  )}
                </div>
              </div>

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
