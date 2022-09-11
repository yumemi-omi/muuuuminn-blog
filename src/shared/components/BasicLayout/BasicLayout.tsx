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
      minHeight={"100vh"}
    >
      <Header />
      <Box>{children}</Box>
      <Footer />
    </Grid>
  );
};
