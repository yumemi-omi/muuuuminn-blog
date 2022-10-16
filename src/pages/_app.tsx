import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";

import theme from "@/libs/chakra/theme";
import { useTranslation } from "@/libs/i18n";

import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "../libs/markdown/prism-override-style.css";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page) => page);

  const { t } = useTranslation();
  const titleTemplate = `%s | ${t.SITE_NAME}`;

  return (
    <>
      <DefaultSeo titleTemplate={titleTemplate} />
      <ChakraProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </>
  );
}

export default MyApp;
