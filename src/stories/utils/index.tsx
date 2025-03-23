import type { Parameters, Decorator } from "@storybook/react";
import DarkMode from "./DarkMode";

export const getDarkModeConfigs = () => {
  const parameters: Parameters = {
    layout: "fullscreen",
  };

  const decorators: Decorator[] = [
    (Story) => (
      <DarkMode>
        <Story />
      </DarkMode>
    ),
  ];

  return {
    parameters: parameters,
    decorators: decorators,
  };
};
