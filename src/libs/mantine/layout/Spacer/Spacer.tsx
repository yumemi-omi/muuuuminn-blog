import type { FC } from "react";

import { Space as _Space } from "@mantine/core";

import type { SpaceProps as _SpaceProps } from "@mantine/core";


type SpaceProps = _SpaceProps;

export const Space: FC<SpaceProps> = (props) => {
  return <_Space {...props} />;
};
