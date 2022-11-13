import { FC } from "react";

import { Box, BoxProps } from "@/libs/chakra";

type PostDetailProps = BoxProps;

export const PostDetail: FC<PostDetailProps> = (props) => {
  const { children } = props;
  return <Box>{children}</Box>;
};
