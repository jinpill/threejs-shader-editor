import { useEffect, useState } from "react";
import Label from "@/components/Label";
import Radio, { type RadioSize } from "..";
import type { Option, OptionValue } from "@/stores/useOptionsStore";
import { CommonSizeContext } from "@/hooks/useCommonSize";
import style from "../style.module.scss";

export type RadioGroupProps<V extends OptionValue> = {
  size?: RadioSize;
  value?: V;
  options?: Option<V>[];
  isDisabled?: boolean;
  onChange?: (value: V) => void;
  className?: string;
};

const RadioGroup = <V extends OptionValue>(props: RadioGroupProps<V>) => {
  const size = props.size ?? "small";

  const [value, setValue] = useState(props.value);
  const options = props.options ?? [];
  const isDisabled = props.isDisabled || options.length === 0;

  const handleChange = (value: V) => {
    if (props.onChange) props.onChange(value);
    else setValue(value);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <ul className={style.group}>
      <CommonSizeContext.Provider value={{ size }}>
        {options.map((option) => (
          <li key={option.value}>
            <Label text={option.label} direction="right">
              <Radio
                value={value === option.value}
                isDisabled={isDisabled}
                onChange={(value) => {
                  if (!value) return;
                  handleChange(option.value);
                }}
              />
            </Label>
          </li>
        ))}
      </CommonSizeContext.Provider>
    </ul>
  );
};

export default RadioGroup;
