import TextInput from "./parts/TextInput";
import PasswordInput from "./parts/PasswordInput";
import NumberInput from "./parts/NumberInput";
import Vector2Input from "./parts/Vector2Input";
import Vector3Input from "./parts/Vector3Input";
import type { CommonSize } from "@/hooks/useCommonSize";

export type InputSize = CommonSize;

export default {
  Text: TextInput,
  Password: PasswordInput,
  Number: NumberInput,
  Vector2: Vector2Input,
  Vector3: Vector3Input,
};
