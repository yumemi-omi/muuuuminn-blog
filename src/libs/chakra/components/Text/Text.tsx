import { Text as OriginText, TextProps as OriginTextProps } from "@chakra-ui/react";
import { FC, memo } from "react";

export type TextProps = OriginTextProps;

const _Text: FC<TextProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginText {...rest}>{children}</OriginText>;
};

export const Text = memo(_Text);
