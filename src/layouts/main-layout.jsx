import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/styles/layout/MainLayout.module.sass";
import Head from "next/head";

const SITE_URL = "https://sebastianarango.com";
const OG_TITLE = "Sebastian Arango — Fullstack & Blockchain Developer";
const OG_DESCRIPTION =
  "Web3 developer portfolio — Solidity, Next.js, TypeScript. Building decentralized applications and smart contracts.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>{OG_TITLE}</title>
        <meta name="description" content={OG_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon-192.png" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:description" content={OG_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sebastian Arango — Web3 Developer" />
        <meta property="og:site_name" content="Sebastian Arango" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Sebas_aran16" />
        <meta name="twitter:creator" content="@Sebas_aran16" />
        <meta name="twitter:title" content={OG_TITLE} />
        <meta name="twitter:description" content={OG_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="Sebastian Arango — Web3 Developer" />

        {/* WhatsApp / generic */}
        <meta itemProp="name" content={OG_TITLE} />
        <meta itemProp="description" content={OG_DESCRIPTION} />
        <meta itemProp="image" content={OG_IMAGE} />

        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
