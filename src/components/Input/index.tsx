import TextInput from "./parts/TextInput";
import PasswordInput from "./parts/PasswordInput";
import NumberInput from "./parts/NumberInput";
import Vector2Input from "./parts/Vector2Input";

export type InputSize = "small" | "large";

export default {
  Text: TextInput,
  Password: PasswordInput,
  Number: NumberInput,
  Vector2: Vector2Input,
};
