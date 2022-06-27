import axios from "axios";
import { useReducer, createContext, useEffect } from "react";
import rootReducer from "./rootReducer";
import { LOGIN, LOGOUT } from "./types";
import { useRouter } from "next/router";

// Initial State
const initialState = {
  user: null,
  open: false,
};

// create context
const Context = createContext();

// root reducer
// const rootReducer = (state, action) => {
//   switch (action.type) {
//     case LOGIN:
//       return { ...state, user: action.payload };
//     case LOGOUT:
//       return { ...state, user: null };
//     default:
//       return state;
//   }
// };

//context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const router = useRouter();

  // getting user data from local storage
  useEffect(() => {
    dispatch({
      type: LOGIN,
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  //axios interceptors
  axios.interceptors.response.use(
    function (response) {
      // any status code that lie within the range of 2xx causes function to trigger
      return response;
    },
    function (error) {
      //any status codes that falls outside the range of 2xx causes function to trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              // console.log("/401 error > logout");
              dispatch({ type: LOGOUT });
              window.localStorage.removeItem("user");
              router.push("/login");
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
