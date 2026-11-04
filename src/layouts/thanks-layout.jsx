import React from "react";
import Header from "@/components/header";
import styles from "@/styles/layout/MainLayout.module.sass";
import Head from "next/head";

const SITE_URL = "https://sebastianarango.com";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export default function ThanksLayout({ children }) {
  return (
    <>
      <Head>
        <title>Thanks — Sebastian Arango</title>
        <meta name="description" content="Thank you for reaching out! I'll get back to you soon." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/thanks`} />
        <meta property="og:title" content="Thanks — Sebastian Arango" />
        <meta property="og:description" content="Thank you for reaching out! I'll get back to you soon." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Sebastian Arango" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Sebas_aran16" />
        <meta name="twitter:title" content="Thanks — Sebastian Arango" />
        <meta name="twitter:description" content="Thank you for reaching out!" />
        <meta name="twitter:image" content={OG_IMAGE} />

        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
}
