import { Navbar } from "../components/Navbar";
import "../styles/styles.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </>
  );
}