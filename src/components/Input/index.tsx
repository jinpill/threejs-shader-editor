import TextInput from "./parts/TextInput";
import PasswordInput from "./parts/PasswordInput";
import NumberInput from "./parts/NumberInput";

export type InputSize = "small" | "large";

export default {
  Text: TextInput,
  Password: PasswordInput,
  Number: NumberInput,
};
