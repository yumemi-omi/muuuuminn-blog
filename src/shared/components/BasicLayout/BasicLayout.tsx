import { FC } from "react";

import { Box, Grid, GridProps } from "@/libs/chakra";
import { Footer } from "@/shared/components/Footer";
import { Header } from "@/shared/components/Header";

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
    >
      {/* TODO: 下スクロールで消す */}
      <Header />
      <Box>{children}</Box>
      {/* TODO: 何かのきっかけをトリガーに消せたら消す */}
      <Footer />
    </Grid>
  );
};
