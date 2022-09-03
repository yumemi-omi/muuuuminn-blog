import { FC } from "react";

import { Box, BoxProps } from "@/shared/libs/chakra";

type ContentProps = { content: string } & BoxProps;

export const Content: FC<ContentProps> = (props) => {
  const { content } = props;
  return <Box dangerouslySetInnerHTML={{ __html: content }} />;
};
