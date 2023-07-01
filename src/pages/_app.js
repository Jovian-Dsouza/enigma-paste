import Layout from "@/components/Layout";
import "@/styles/globals.css";
import Head from "next/head";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { AppContextProvider } from "@/data/AppContext";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain="goerli">
      <AppContextProvider>
        <div>
          <Head>
            <title>EngimaPaste</title>
            <link rel="icon" href="/favicon.svg" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </AppContextProvider>
    </ThirdwebProvider>
  );
}
