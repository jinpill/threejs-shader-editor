import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import style from "./Input.module.scss";

type InputProps = {
  type: "text" | "number" | "password";
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: string;

  start?: string;
  end?: string;

  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input = (props: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(event.target.value);
  };

  return (
    <TextField
      className={style.input}
      variant="standard"
      type={props.type}
      label={props.label}
      placeholder={props.placeholder}
      slotProps={{
        htmlInput: {
          min: props.min,
          max: props.max,
          step: props.step,
        },
        input: {
          startAdornment: props.start ? (
            <InputAdornment position="start">{props.start}</InputAdornment>
          ) : null,
          endAdornment: props.end ? (
            <InputAdornment position="end">{props.end}</InputAdornment>
          ) : null,
        },
      }}
      value={props.value}
      onChange={handleChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onKeyDown={props.onKeyDown}
    />
  );
};

export default Input;
