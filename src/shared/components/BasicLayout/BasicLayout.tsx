import { FC } from "react";

import { Box, Grid, GridProps } from "@/libs/chakra";
import { Footer } from "@/shared/components/BasicLayout/Footer";
import { Header } from "@/shared/components/BasicLayout/Header";

type BasicLayoutProps = GridProps;

export const BasicLayout: FC<BasicLayoutProps> = (props) => {
  const { children } = props;
  return (
    <Grid
      // TODO: need responsive
      maxWidth={"1200px"}
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
      <Header />
      <Box>{children}</Box>
      {/* TODO: 何かのきっかけをトリガーに消せたら消す */}
      <Footer />
    </Grid>
  );
};
