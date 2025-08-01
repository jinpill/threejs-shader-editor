import { useEffect, useRef, useState } from "react";
import Scrim from "@/components/Scrim";
import Scrollbar from "@/components/Scrollbar";
import { useOptionsStore } from "@/stores/useOptionsStore";
import style from "./style.module.scss";

const Options = () => {
  const scrimRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { options, setOptions } = useOptionsStore();
  const [styles, setStyles] = useState<React.CSSProperties | null>(null);

  useEffect(() => {
    const $scrim = scrimRef.current;
    const scrimRect = $scrim?.getBoundingClientRect();
    if (!options || !scrimRect) {
      setStyles(null);
      return;
    }

    const width = options.rect.width;
    const top = options.rect.top - scrimRect.top + options.rect.height;
    const left = options.rect.left - scrimRect.left;

    setStyles({
      width,
      top,
      left,
    });
  }, [options]);

  useEffect(() => {
    const $list = listRef.current;
    if (!$list || !styles) return;

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
  }, [styles]);

  if (!options) return null;
  return (
    <Scrim ref={scrimRef} opacity={0} onClick={() => setOptions(null)}>
      {styles && (
        <Scrollbar className={style.options} style={styles}>
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
                {option.label}
              </li>
            ))}
          </ul>
        </Scrollbar>
      )}
    </Scrim>
  );
};

export default Options;
