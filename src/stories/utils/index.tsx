import type { Parameters, Decorator } from "@storybook/react";
import Container, { ContainerProps } from "./Container";

export const getContainerConfigs = (params?: Omit<ContainerProps, "children">) => {
  const parameters: Parameters = {
    layout: "fullscreen",
  };

  const decorators: Decorator[] = [
    (Story) => (
      <Container {...params}>
        <Story />
      </Container>
    ),
  ];

  return {
    parameters: parameters,
    decorators: decorators,
  };
};
