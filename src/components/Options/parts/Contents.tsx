import { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";

import Scrim from "@/components/Scrim";
import Scrollbar from "@/components/Scrollbar";
import Icon from "@/components/Icon";

import useMountAnimation from "@/hooks/useMountAnimation";
import useScrollbar from "@/hooks/useScrollbar";
import { useOptionsStore, type Option } from "@/stores/useOptionsStore";

import style from "../style.module.scss";

const Contents = () => {
  const scrimRef = useRef<HTMLDivElement>(null);
  const helperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const setScrollTop = useScrollbar();

  const { getOptions, setOptions } = useOptionsStore();
  const { isUnmounting, handleAnimationEnd } = useMountAnimation();
  const options = useMemo(() => getOptions()!, [getOptions]);

  const [isTop, setIsTop] = useState(false);
  const index = useMemo(() => {
    return options.list.findIndex((option) => option.value === options.value);
  }, [options.value, options.list]);

  const getTitleAttr = (option: Option<string | number>) => {
    let title = option.label;
    if (option.description) title += ` - ${option.description}`;
    return title;
  };

  useEffect(() => {
    const $scrollbar = scrollbarRef.current;
    if (!$scrollbar) return;

    const $scrim = scrimRef.current;
    const scrimRect = $scrim?.getBoundingClientRect();
    if (!scrimRect) {
      $scrollbar.style.width = "";
      $scrollbar.style.height = "";
      $scrollbar.style.top = "";
      $scrollbar.style.left = "";
      return;
    }

    const rect = options.rect;
    $scrollbar.style.width = `${rect.width}px`;
    $scrollbar.style.top = `${rect.top - scrimRect.top + rect.height}px`;
    $scrollbar.style.left = `${rect.left - scrimRect.left}px`;
  }, [options, scrollbarRef]);

  useEffect(() => {
    const $scrim = scrimRef.current;
    const $helper = helperRef.current;
    const $scrollbar = scrollbarRef.current;
    const $list = listRef.current;
    if (!$scrim || !$helper || !$scrollbar || !$list) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        $scrollbar.style.height = `${entry.target.clientHeight}px`;

        setScrollTop($scrollbar, (data) => {
          const $firstOption = data.$contents.querySelector("li:first-child");
          const $selectedOption = data.$contents.querySelector(
            `li:nth-child(${index + 1})`,
          );

          const firstOptionRect = $firstOption?.getBoundingClientRect();
          const selectedOptionRect = $selectedOption?.getBoundingClientRect();
          if (!firstOptionRect || !selectedOptionRect) return null;
          return selectedOptionRect.top - firstOptionRect.top;
        });

        const d = getDimension();
        const remainingSpace = calcRemainingSpace(d);

        // 아래에 공간이 충분함
        if (remainingSpace.bottom >= 0) return;

        // 위에 공간이 충분함
        if (remainingSpace.top >= 0) {
          $scrollbar.style.top = `${remainingSpace.top + d.margin * 2}px`;
          setIsTop(true);
          return;
        }

        // 아래의 공간이 더 넓음
        if (remainingSpace.top <= remainingSpace.bottom) {
          const { height } = calcForBottomDirection(d);
          $scrollbar.style.height = `${height}px`;
          return;
        }

        // 위의 공간이 더 넓음
        const { height, top } = calcForTopDirection(d);
        $scrollbar.style.top = `${top}px`;
        $scrollbar.style.height = `${height}px`;
        setIsTop(true);
      }
    });

    type Dimension = {
      rect: DOMRect;
      scrimRect: DOMRect;
      scrollbarRect: DOMRect;
      margin: number;
    };

    const getDimension = (): Dimension => {
      const rect = options.rect;
      const scrimRect = $scrim.getBoundingClientRect();
      const helperRect = $helper.getBoundingClientRect();
      const scrollbarRect = $scrollbar.getBoundingClientRect();
      const margin = helperRect.height;

      return {
        rect,
        scrimRect,
        scrollbarRect,
        margin,
      };
    };

    const calcRemainingSpace = (d: Dimension) => {
      const actualHeight = d.scrollbarRect.height;
      const actualTop = d.scrollbarRect.top - d.scrimRect.top + d.margin;

      const bottom = d.scrimRect.height - actualTop - actualHeight - d.margin;
      const top = d.rect.top - d.scrimRect.top - d.scrollbarRect.height - d.margin * 2;

      return {
        bottom: Math.round(bottom),
        top: Math.round(top),
      };
    };

    const calcForBottomDirection = (d: Dimension) => {
      const height =
        d.scrimRect.height + d.scrimRect.top - d.rect.top - d.rect.height - d.margin * 2;

      return {
        height,
      };
    };

    const calcForTopDirection = (d: Dimension) => {
      const height = d.rect.top - d.scrimRect.top - d.margin * 2;
      const top = d.margin * 2;

      return {
        height,
        top,
      };
    };

    observer.observe($list);
    return () => observer.disconnect();
  }, [options.rect, index, setScrollTop]);

  useEffect(() => {
    const $list = listRef.current;
    if (!$list) return;

    const $option = $list.children[index] as HTMLElement;
    $option?.focus();
  }, [index]);

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
      <div ref={helperRef} className={style.translateHelper} />

      <Scrollbar
        ref={scrollbarRef}
        className={classNames(style.options, style[options.size], {
          [style.unmounting]: isUnmounting,
          [style.top]: isTop,
        })}
        onAnimationEnd={handleAnimationEnd}
      >
        <ul ref={listRef} className={style.list}>
          {options.list.map((option, i) => (
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

              {i === index && <Icon className={style.checkIcon} icon="check" />}
            </li>
          ))}
        </ul>
      </Scrollbar>
    </Scrim>
  );
};

export default Contents;
