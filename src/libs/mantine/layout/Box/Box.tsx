import {
  Box as OriginBox,
  BoxProps as OriginBoxProps,
  createPolymorphicComponent,
} from "@mantine/core";
import { forwardRef } from "react";

export type BoxProps = OriginBoxProps;

const _Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <OriginBox {...rest} ref={ref}>
      {children}
    </OriginBox>
  );
});

_Box.displayName = "_Box";

export const Box = createPolymorphicComponent<"div", BoxProps>(_Box);
