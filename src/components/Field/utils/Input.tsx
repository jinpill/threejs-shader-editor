import TextField from "@mui/material/TextField";
import style from "./Input.module.scss";

type InputProps = {
  type: "text" | "number" | "password";
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  value?: string;

  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
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
        },
      }}
      value={props.value}
      onChange={handleChange}
      onAbort={props.onBlur}
      onFocus={props.onFocus}
    />
  );
};

export default Input;
