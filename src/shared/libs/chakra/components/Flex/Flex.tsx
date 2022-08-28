import { Flex as OriginFlex, FlexProps as OriginFlexProps } from "@chakra-ui/react";
import { FC } from "react";

export type FlexProps = OriginFlexProps;

export const Flex: FC<FlexProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginFlex {...rest}>{children}</OriginFlex>;
};
