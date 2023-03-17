import { FC } from "react";

import { Box, Grid, GridProps } from "@/libs/chakra";

import { Footer } from "./Footer";
import { Header } from "./Header";

type BaseLayoutProps = GridProps;

export const BaseLayout: FC<BaseLayoutProps> = (props) => {
  const { children } = props;
  return (
    <Grid
      marginX={"auto"}
      maxWidth={"690px"}
      paddingX={{ base: 2, md: 4 }}
      sx={{
        minHeight: "100vh",
        "&": {
          minHeight: "100svh",
        },
      }}
      templateColumns={"100%"}
      templateRows={"auto 1fr auto"}
    >
      {/* TODO: 下スクロールで消す */}
      {/* TODO: headerとbodyのマージンを少し離してもいいかも */}
      <Header />
      <Box as={"main"}>{children}</Box>
      {/* TODO: 何かのきっかけをトリガーに消せたら消す */}
      <Footer />
    </Grid>
  );
};
