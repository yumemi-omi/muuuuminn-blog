import { Grid as OriginGrid, GridProps as OriginGridProps } from "@chakra-ui/react";
import { FC } from "react";

export type GridProps = OriginGridProps;

export const Grid: FC<GridProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginGrid {...rest}>{children}</OriginGrid>;
};
