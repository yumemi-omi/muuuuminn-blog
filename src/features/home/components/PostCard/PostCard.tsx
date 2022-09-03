import { FC } from "react";

import { Box, BoxProps } from "@/libs/chakra";

type PostCardProps = BoxProps;

export const PostCard: FC<PostCardProps> = (props) => {
  const { children } = props;
  return <Box>{children}</Box>;
};
