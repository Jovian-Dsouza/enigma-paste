import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <title>EngimaPaste</title>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
