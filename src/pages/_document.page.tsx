// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

import theme from "@/libs/chakra/theme";

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
          <script async src="https://embed.zenn.studio/js/listen-embed-event.js"></script>
          <link href="/favicons/favicon.ico" rel="icon" sizes="any" />
          <link href="/favicons/icon.svg" rel="icon" type="image/svg+xml" />
          <link href="/favicons/apple-touch-icon.png" rel="apple-touch-icon" />
          <link href="/favicons/site.webmanifest" rel="manifest" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
