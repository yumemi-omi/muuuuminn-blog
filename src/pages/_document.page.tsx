// pages/_document.js

import { ColorMode, ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

import theme from "@/libs/chakra/theme";

type MaybeColorMode = ColorMode | undefined;
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const initialColorMode = theme.config.initialColorMode as MaybeColorMode;

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <script
            async
            crossOrigin="anonymous"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9104412012929052"
          ></script>
          <script async defer src="https://embed.zenn.studio/js/listen-embed-event.js"></script>
          <link href="/favicons/favicon.ico" rel="icon" sizes="any" />
          <link href="/favicons/icon.svg" rel="icon" type="image/svg+xml" />
          <link href="/favicons/apple-touch-icon.png" rel="apple-touch-icon" />
          <link href="/favicons/site.webmanifest" rel="manifest" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
