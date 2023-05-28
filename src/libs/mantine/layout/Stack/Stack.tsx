import { forwardRef } from "react";

import {
  Stack as OriginalStack,
  Group as OriginalGroup,
  createPolymorphicComponent,
} from "@mantine/core";

import type {
  StackProps as OriginalStackProps,
  GroupProps as OriginalGroupProps} from "@mantine/core";


export type StackProps = OriginalStackProps;

const _Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <OriginalStack {...rest} ref={ref}>
      {children}
    </OriginalStack>
  );
});

_Stack.displayName = "_Stack";

export const Stack = createPolymorphicComponent<"div", StackProps>(_Stack);

export const _VStack = Stack;

type GroupProps = OriginalGroupProps;

const _HStack = forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <OriginalGroup {...rest} ref={ref}>
      {children}
    </OriginalGroup>
  );
});

_HStack.displayName = "_HStack";

export const HStack = createPolymorphicComponent<"div", GroupProps>(_HStack);
