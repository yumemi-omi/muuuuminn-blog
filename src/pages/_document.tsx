// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

import theme from "@/libs/chakra/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="jp">
        <Head>
          <script async src="https://embed.zenn.studio/js/listen-embed-event.js"></script>
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
