
import type { FC} from "react";
import { memo } from "react";

import { Text as OriginText } from "@mantine/core";

import type { TextProps as OriginTextProps } from "@mantine/core";

export type TextProps = OriginTextProps;

const _Text: FC<TextProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginText {...rest}>{children}</OriginText>;
};

export const Text = memo(_Text);
