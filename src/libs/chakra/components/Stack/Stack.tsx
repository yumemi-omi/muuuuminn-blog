import { Stack as OriginStack, StackProps as OriginStackProps } from "@chakra-ui/react";
import { FC } from "react";

export type StackProps = OriginStackProps;

export const Stack: FC<StackProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginStack {...rest}>{children}</OriginStack>;
};
