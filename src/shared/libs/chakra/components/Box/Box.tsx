import { Box as OriginBox, BoxProps as OriginBoxProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface BoxProps extends OriginBoxProps {
  children: ReactNode;
}

export const Box: FC<BoxProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginBox {...rest}>{children}</OriginBox>;
};
