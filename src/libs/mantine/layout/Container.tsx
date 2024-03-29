import type { FC, ReactNode } from "react";

import { Container as _Container } from "@mantine/core";

import type { ContainerProps as _ContainerProps } from "@mantine/core";


type ContainerProps = {
  children: ReactNode;
} & _ContainerProps;

export const Container: FC<ContainerProps> = (props) => {
  const { children, ...rest } = props;
  return <_Container {...rest}>{children}</_Container>;
};
