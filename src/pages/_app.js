import "@/styles/globals.sass";
import MainLayout from "@/layouts/main-layout";
import { appWithTranslation } from "next-i18next";
import { SpeedInsights } from "@vercel/speed-insights/react";
import LenisProvider from "@/providers/LenisProvider";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Inter } from "@next/font/google";

// One variable font file covers every weight, self-hosted by next/font.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${inter.style.fontFamily};
        }
      `}</style>
      <LenisProvider>
        <ScrollProgressBar />
        {getLayout(<Component {...pageProps} />)}
        <SpeedInsights />
      </LenisProvider>
    </>
  );
}

export default appWithTranslation(App);
