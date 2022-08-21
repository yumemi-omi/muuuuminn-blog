import { Stack as OriginStack, StackProps as OriginStackProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface StackProps extends OriginStackProps {
  children: ReactNode;
}

export const Stack: FC<StackProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginStack {...rest}>{children}</OriginStack>;
};
