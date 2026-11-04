import { Html, Head, Main, NextScript } from "next/document";

// Flags JS support before first paint so scroll-reveal styles only hide
// content when the script that reveals it is going to run.
const JS_FLAG = "document.documentElement.classList.add('js')";

export default function Document() {
  return (
    <Html>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
