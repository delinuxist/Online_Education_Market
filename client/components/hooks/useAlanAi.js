import React from "react";
import { useEffect } from "react";

const useAlanAi = (object) => {
  console.log(object);
  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    alanBtn({
      key: "60faa2da1bbcaa04b751d33ff08373102e956eca572e1d8b807a3e2338fdd0dc/stage",
      object,
      // onCommand: ({ command }) => {
      //   if (command === commandString) {
      //     action();
      //   }
      //   // onCommand: ({ command }) => {
      //   //   if (command === "login page") {
      //   //     router.push("/login");
      //   //   }
      //   // if (command === "signup page") {
      //   //   router.push("/register");
      //   // }
      // },
      rootEl: document.getElementById("alan-btn"),
    });
  }, [object]);
};

export default useAlanAi;
