import Layout from "@/components/Layout";
import "@/styles/globals.css";
import Head from "next/head";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { goerli } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <div>
        <Head>
          <title>EngimaPaste</title>
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </WagmiConfig>
  );
}
