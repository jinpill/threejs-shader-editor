import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Label from ".";

import Options from "@/components/Options";
import Input from "@/components/Input";
import CheckBox from "@/components/CheckBox";
import Dropdown from "@/components/Dropdown";

const meta = {
  title: "Reusable/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopLabel: Story = {
  args: {
    text: "E-mail",
    direction: "top",
    children: <Input.Text placeholder="Enter your e-mail" />,
  },
};

export const LeftLabel: Story = {
  args: {
    text: "E-mail",
    direction: "left",
    children: <Input.Text placeholder="Enter your e-mail" />,
  },
};

export const MultipleLeftLabel: Story = {
  args: {
    text: "",
  },
  render: () => {
    const [lang, setLang] = useState("en");

    return (
      <div>
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <Dropdown
            options={[
              { label: "Korean", value: "ko" },
              { label: "English", value: "en" },
            ]}
            value={lang}
            onChange={setLang}
          />
        </div>

        <Label.Group>
          <Label text={lang === "en" ? "My name" : "이름"} direction="left">
            <Input.Text placeholder="Enter your e-mail" />
          </Label>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginTop: "1rem",
              paddingTop: "1rem",
              borderTop: "0.0625rem solid var(--Border-Light-Primary)",
            }}
          >
            <Label text={lang === "en" ? "Company" : "직장"} direction="left">
              <Input.Text placeholder="Enter your e-mail" />
            </Label>

            <Label text={lang === "en" ? "Job" : "직업"} direction="left">
              <Input.Text placeholder="Enter your e-mail" />
            </Label>
          </div>
        </Label.Group>

        <Options />
      </div>
    );
  },
};

export const RightLabel: Story = {
  args: {
    text: "어쩌구 저쩌구 약관에 동의합니다. 어쩌구 저쩌구 약관에 동의합니다. 어쩌구 저쩌구 약관에 동의합니다. 어쩌구 저쩌구 약관에 동의합니다.",
    // text: "어쩌구 저쩌구 약관에 동의합니다.",
    direction: "right",
    children: <CheckBox />,
  },
  render: (args) => (
    <div style={{ width: "18.75rem" }}>
      <Label {...args} />
    </div>
  ),
};
