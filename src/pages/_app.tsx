import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";

import theme from "@/libs/chakra/theme";

import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <ChakraProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </>
  );
}

export default MyApp;
