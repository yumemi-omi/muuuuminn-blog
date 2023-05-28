import { forwardRef } from "react";

import { Box as OriginBox, createPolymorphicComponent } from "@mantine/core";

import type { BoxProps as OriginBoxProps } from "@mantine/core";

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
