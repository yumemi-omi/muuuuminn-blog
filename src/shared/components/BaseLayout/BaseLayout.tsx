import { FC } from "react";

import { Box, Grid, GridProps } from "@/libs/chakra";
import { Footer } from "@/shared/components/BaseLayout/Footer";
import { Header } from "@/shared/components/BaseLayout/Header";

type BaseLayoutProps = GridProps;

export const BaseLayout: FC<BaseLayoutProps> = (props) => {
  const { children } = props;
  return (
    <Grid
      maxWidth={"690px"}
      marginX={"auto"}
      templateRows={"auto 1fr auto"}
      templateColumns={"100%"}
      sx={{
        minHeight: "100vh",
        "&": {
          minHeight: "100svh",
        },
      }}
      paddingX={{ base: 2, md: 4 }}
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
