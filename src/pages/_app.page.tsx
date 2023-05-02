import { DehydratedState } from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { ReactElement, ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { RecoilHistorySyncJSONNext } from "recoil-sync-next";

import { GoogleTagManager } from "@/features/gtm/components";
import { gtmId } from "@/features/gtm/constants/gtmId";
import { GoogleTagManagerIdType } from "@/features/gtm/types";
import { useTranslation } from "@/libs/i18n";
import { MantineProvider } from "@/libs/mantine/provider";
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
      <Head>
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <GoogleTagManager googleTagManagerId={gtmId as GoogleTagManagerIdType} />
      <DefaultSeo titleTemplate={titleTemplate} />
      <QueryClientProvider dehydratedState={pageProps.dehydratedState}>
        <RecoilRoot>
          <RecoilHistorySyncJSONNext storeKey="ui-state">
            <MantineProvider>{getLayout(<Component {...pageProps} />)}</MantineProvider>
          </RecoilHistorySyncJSONNext>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
