import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <title>Jovi Dex</title>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
