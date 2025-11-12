import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useArgs } from "@storybook/preview-api";
import Input from ".";

const Decorator = (props: React.PropsWithChildren) => (
  <div
    style={{
      height: "20rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    }}
  >
    {props.children}
  </div>
);

const TextInputMeta = {
  title: "Reusable/Input",
  component: Input.Text,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
} satisfies Meta<typeof Input.Text>;

export default TextInputMeta;
type TextInputStory = StoryObj<typeof TextInputMeta>;

export const Text: TextInputStory = {
  args: {
    size: "small",
    placeholder: "Enter Text...",
    value: "",
    maxLength: 20,
    isFullWidth: false,
    isReadOnly: false,
    isDisabled: false,
  },
  render: (args) => {
    const [{ value }, setValue] = useArgs();

    const handleChange = (value: string) => {
      setValue({ value });
      args.onChange?.(value);
    };

    return <Input.Text {...args} value={value} onChange={handleChange} />;
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PasswordInputMeta = {
  title: "Reusable/Input",
  component: Input.Password,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
} satisfies Meta<typeof Input.Password>;

type PasswordInputStory = StoryObj<typeof PasswordInputMeta>;

export const Password: PasswordInputStory = {
  args: {
    size: "small",
    placeholder: "Enter Password...",
    value: "",
    maxLength: 20,
    isFullWidth: false,
    isReadOnly: false,
    isDisabled: false,
  },
  render: (args) => {
    const [{ value }, setValue] = useArgs();

    const handleChange = (value: string) => {
      setValue({ value });
      args.onChange?.(value);
    };

    return <Input.Password {...args} value={value} onChange={handleChange} />;
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NumberInputMeta = {
  title: "Reusable/Input",
  component: Input.Number,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
  decorators: [
    (Story) => (
      <Decorator>
        <Story />
      </Decorator>
    ),
  ],
} satisfies Meta<typeof Input.Number>;

type NumberInputStory = StoryObj<typeof NumberInputMeta>;

export const Number: NumberInputStory = {
  args: {
    size: "small",
    min: -100,
    max: 100,
    step: 1,
    decimals: 3,
    unit: "",
    isFullWidth: false,
    isReadOnly: false,
    isDisabled: false,
  },
  render: (args) => {
    const [{ value }, setValue] = useArgs();

    const handleChange = (value: number) => {
      setValue({ value });
      args.onChange?.(value);
    };

    return <Input.Number {...args} value={value} onChange={handleChange} />;
  },
};
