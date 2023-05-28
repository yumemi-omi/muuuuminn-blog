import { forwardRef } from "react";

import {
  createPolymorphicComponent,
  Flex as OriginFlex
} from "@mantine/core";

import type {
  FlexProps as OriginFlexProps} from "@mantine/core";


export type FlexProps = OriginFlexProps;

const _Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <OriginFlex {...rest} ref={ref}>
      {children}
    </OriginFlex>
  );
});

_Flex.displayName = "_Flex";

export const Flex = createPolymorphicComponent<"div", FlexProps>(_Flex);
