import {
  Stack as OriginStack,
  StackProps as OriginStackProps,
  VStack as OriginVStack,
  HStack as OriginHStack,
} from "@chakra-ui/react";
import { FC } from "react";

export type StackProps = OriginStackProps;

export const Stack: FC<StackProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginStack {...rest}>{children}</OriginStack>;
};

export const VStack: FC<StackProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginVStack {...rest}>{children}</OriginVStack>;
};

export const HStack: FC<StackProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginHStack {...rest}>{children}</OriginHStack>;
};
