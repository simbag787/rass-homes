import { Navbar } from "../components/Navbar";
import "../styles/styles.css";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
