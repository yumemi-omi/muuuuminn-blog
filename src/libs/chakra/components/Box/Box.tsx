import { Box as OriginBox, BoxProps as OriginBoxProps } from "@chakra-ui/react";
import { FC } from "react";

export type BoxProps = OriginBoxProps;

export const Box: FC<BoxProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginBox {...rest}>{children}</OriginBox>;
};
