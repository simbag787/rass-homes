import { Navbar } from "../components/Navbar";
import "../styles/styles.css";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar></Navbar>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}