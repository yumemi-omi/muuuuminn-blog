import { FC } from "react";

import { Box, BoxProps } from "@/libs/chakra";

type ContentProps = { html: string } & BoxProps;

export const Content: FC<ContentProps> = (props) => {
  const { html } = props;
  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};
