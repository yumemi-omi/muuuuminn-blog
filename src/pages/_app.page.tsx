import { ChakraProvider } from "@chakra-ui/react";
import { DehydratedState } from "@tanstack/react-query";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import { ReactElement, ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { RecoilHistorySyncJSONNext } from "recoil-sync-next";

import theme from "@/libs/chakra/theme";
import { useTranslation } from "@/libs/i18n";
import QueryClientProvider from "@/libs/reactQuery/QueryClientProvider";

import type { AppProps } from "next/app";

import "zenn-content-css";
import "../libs/markdown/prism-override-style.css";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<{ dehydratedState: DehydratedState }>;
  pageProps: {
    dehydratedState: DehydratedState;
  };
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page) => page);

  const { t } = useTranslation();
  const titleTemplate = `${t.SITE_NAME}`;

  return (
    <>
      <DefaultSeo titleTemplate={titleTemplate} />
      <QueryClientProvider dehydratedState={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <RecoilRoot>
            <RecoilHistorySyncJSONNext storeKey="ui-state">
              {getLayout(<Component {...pageProps} />)}
            </RecoilHistorySyncJSONNext>
          </RecoilRoot>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
