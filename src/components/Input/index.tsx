import TextInput from "./parts/TextInput";
import PasswordInput from "./parts/PasswordInput";
import NumberInput from "./parts/NumberInput";
import Vector2Input from "./parts/Vector2Input";
import Vector3Input from "./parts/Vector3Input";

export type InputSize = "small" | "large";

export default {
  Text: TextInput,
  Password: PasswordInput,
  Number: NumberInput,
  Vector2: Vector2Input,
  Vector3: Vector3Input,
};
