import { Box as OriginBox, BoxProps as OriginBoxProps } from "@chakra-ui/react";
import { FC, memo } from "react";

export type BoxProps = OriginBoxProps;

export const Box: FC<BoxProps> = memo(function _box(props) {
  const { children, ...rest } = props;
  return <OriginBox {...rest}>{children}</OriginBox>;
});
