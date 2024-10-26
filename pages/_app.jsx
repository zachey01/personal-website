import Head from "next/head";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import { Noto_Sans } from "next/font/google";
import { motion } from "framer-motion";
import Layout from "./components/layout/Layout";

import { Analytics } from "@vercel/analytics/react";

const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

const MyApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 8000);
    return () => clearTimeout(timeout);
  }, []);

  if (Component.getLayout) {
    return (
      <>
        <Head>
          <title>{process.env.name} | Portfolio </title>
          <Analytics />
        </Head>
        <Component {...pageProps} className="overflow-hidden" />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{process.env.name} | Portfolio </title>
        {/* Preload Noto Sans font */}
        <link
          rel="preload"
          href={notoSans.href}
          as="font"
          type="font/woff2"
          crossorigin
        />
      </Head>

      <>
        <Layout>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { type: "spring", duration: 1 },
            }}
            className={`${notoSans.className} overflow-hidden bg-[#000] relative`}
          >
            <Component {...pageProps} />
          </motion.div>
        </Layout>
      </>
    </>
  );
};

export default MyApp;
