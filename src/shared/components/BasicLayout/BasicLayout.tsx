import { FC } from "react";

import { Footer } from "@/shared/components/Footer";
import { Header } from "@/shared/components/Header";
import { Box } from "@/shared/libs/chakra/components/Box";
import { Grid, GridProps } from "@/shared/libs/chakra/components/Grid";

type BasicLayoutProps = GridProps;

export const BasicLayout: FC<BasicLayoutProps> = (props) => {
  const { children } = props;
  return (
    <Grid templateRows={"auto 1fr auto"} templateColumns={"100%"} minHeight={"100vh"}>
      <Header />
      <Box>{children}</Box>
      <Footer />
    </Grid>
  );
};
