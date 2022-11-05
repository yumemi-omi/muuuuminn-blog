import { Box as OriginBox, BoxProps as OriginBoxProps, forwardRef } from "@chakra-ui/react";
import {} from "react";

export type BoxProps = OriginBoxProps;

export const Box = forwardRef<BoxProps, "div">((props, ref) => {
  const { children, ...rest } = props;
  return (
    <OriginBox {...rest} ref={ref}>
      {children}
    </OriginBox>
  );
});
