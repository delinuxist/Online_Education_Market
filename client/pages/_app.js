import Navbar from "../components/Layout/Navbar";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "antd/dist/antd.css";
import { Provider } from "../context/index";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
// import useAlanAi from "../components/hooks/useAlanAi";
import AlanInitializer from "../components/Layout/AlanInitializer";
import { useState } from "react";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // const router = useRouter();

  // const loginPage = () => {
  //   router.push("/login");
  // };

  // const signupPage = () => {
  //   router.push("/register");
  // };

  // const params = {
  //   onCommand: ({ command }) => {
  //     if (command === "login page") {
  //       loginPage();
  //     }
  //   },
  //   onCommand: ({ command }) => {
  //     if (command === "signup page") {
  //       signupPage();
  //     }
  //   },
  // };

  // useAlanAi(params);

  return (
    <Provider>
      <ToastContainer position="top-center" />
      <Navbar />
      <SessionProvider session={session}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
