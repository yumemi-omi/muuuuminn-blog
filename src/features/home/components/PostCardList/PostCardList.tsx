import { FC } from "react";

import { Box, BoxProps } from "@/libs/chakra";

type PostCardListProps = BoxProps;

export const PostCardList: FC<PostCardListProps> = (props) => {
  const { children } = props;
  return <Box>{children}</Box>;
};
