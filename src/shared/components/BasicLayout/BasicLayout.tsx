import { FC } from "react";

import { Footer } from "@/shared/components/Footer";
import { Header } from "@/shared/components/Header";
import { Box, Grid, GridProps } from "@/shared/libs/chakra";

type BasicLayoutProps = GridProps;

export const BasicLayout: FC<BasicLayoutProps> = (props) => {
  const { children } = props;
  return (
    <Grid
      // TODO: need responsive
      width={"1400px"}
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
