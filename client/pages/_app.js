import Navbar from "../components/Layout/Navbar";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
