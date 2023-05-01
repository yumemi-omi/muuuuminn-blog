import { Container as _Container, ContainerProps as _ContainerProps } from "@mantine/core";
import { FC, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
} & _ContainerProps;

export const Container: FC<ContainerProps> = (props) => {
  const { children, ...rest } = props;
  return <_Container {...rest}>{children}</_Container>;
};
