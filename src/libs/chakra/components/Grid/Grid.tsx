import {
  Grid as OriginGrid,
  GridProps as OriginGridProps,
  GridItem as OriginGridItem,
  GridItemProps as OriginGridItemProps,
} from "@chakra-ui/react";
import { FC } from "react";

export type GridProps = OriginGridProps;

export const Grid: FC<GridProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginGrid {...rest}>{children}</OriginGrid>;
};

export type GridItemProps = OriginGridItemProps;

export const GridItem: FC<GridItemProps> = (props) => {
  const { children, ...rest } = props;
  return <OriginGridItem {...rest}>{children}</OriginGridItem>;
};
