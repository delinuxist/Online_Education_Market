import { Html, Head, Main, NextScript } from "next/document";
// eslint-disable-next-line @next/next/no-script-in-document
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="mario">
          <Script src="https://kaboomjs.com/lib/0.5.0/kaboom.js" />
          <Script src="./games/game.js" />
        </div>
      </body>
    </Html>
  );
}
