import { ChakraProvider } from "@chakra-ui/react";
import { DehydratedState } from "@tanstack/react-query";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { ReactElement, ReactNode } from "react";

import theme from "@/libs/chakra/theme";
import { useTranslation } from "@/libs/i18n";
import QueryClientProvider from "@/libs/reactQuery/QueryClientProvider";

import type { AppProps } from "next/app";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    dehydratedState: DehydratedState;
  };
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const { dehydratedState, ..._pageProps } = pageProps;
  const getLayout = Component.getLayout ?? ((page) => page);

  const { t } = useTranslation();
  const titleTemplate = `%s | ${t.SITE_NAME}`;

  return (
    <>
      <DefaultSeo titleTemplate={titleTemplate} />
      <QueryClientProvider dehydratedState={dehydratedState}>
        <ChakraProvider theme={theme}>{getLayout(<Component {..._pageProps} />)}</ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
