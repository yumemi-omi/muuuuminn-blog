import { Box, BoxProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

import { Footer } from "@/shared/components/Footer";
import { Header } from "@/shared/components/Header";

interface BasicLayoutProps extends BoxProps {
  children: ReactNode;
}

export const BasicLayout: FC<BasicLayoutProps> = (props) => {
  const { children } = props;
  return (
    <Box>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};
