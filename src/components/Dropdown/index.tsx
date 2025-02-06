import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

type DropdownProps = {
  value?: string;
  options?: Option[];
  message?: string;
  onChange?: (value: string) => void;
};

type Option = {
  value: string;
  label: string;
};

const Dropdown = (props: DropdownProps) => {
  const options = props.options ?? [];

  const handleChange = (event: SelectChangeEvent<string>) => {
    props.onChange?.(event.target.value);
  };

  return (
    <FormControl>
      <Select value={props.value} displayEmpty onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {props.message && <FormHelperText>{props.message}</FormHelperText>}
    </FormControl>
  );
};

export default Dropdown;
