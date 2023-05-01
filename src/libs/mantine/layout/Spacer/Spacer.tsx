import { Space as _Space, SpaceProps as _SpaceProps } from "@mantine/core";
import { FC } from "react";

type SpaceProps = _SpaceProps;

export const Space: FC<SpaceProps> = (props) => {
  return <_Space {...props} />;
};
