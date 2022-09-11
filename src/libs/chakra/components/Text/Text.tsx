import { Text as OriginText, TextProps as OriginTextProps } from "@chakra-ui/react";
import { FC } from "react";

type TextProps = OriginTextProps;

export const Text: FC<TextProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginText {...rest}>{children}</OriginText>;
};
