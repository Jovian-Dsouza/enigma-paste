import Layout from "@/components/Layout";
import "@/styles/globals.css";
import Head from "next/head";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>EngimaPaste</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
