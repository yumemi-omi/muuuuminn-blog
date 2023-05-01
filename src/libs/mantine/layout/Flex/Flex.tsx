import {
  createPolymorphicComponent,
  Flex as OriginFlex,
  FlexProps as OriginFlexProps,
} from "@mantine/core";
import { forwardRef } from "react";

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
