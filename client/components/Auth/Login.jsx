import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../../context/index";
import { useRouter } from "next/router";
import { LOGIN } from "../../context/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // router
  const router = useRouter();

  // access state
  const { state, dispatch } = useContext(Context);

  // destructuring user from state
  const { user } = state;

  // Redirect user to home page when logged in
  useEffect(() => {
    if (user !== null) {
      router.push("/home");
    }
  }, [router, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/server/login`, {
        email: email,
        password: password,
      });

      setLoading(false);

      // dispatch data recieved after login to state
      dispatch({
        type: LOGIN,
        payload: data.user,
      });

      // save data in local storage
      window.localStorage.setItem("user", JSON.stringify(data.user));

      if (data.success) {
        toast.success("Loggged In Successfully");
        router.push("/home");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <section className="flex items-center justify-center w-screen h-screen ">
      <form
        onSubmit={handleSubmit}
        className=" pt-[100px] w-full  md:mx-auto lg:pt-24"
      >
        <div className="max-w-xl mx-auto rounded-md shadow-2xl ring-1 ring-slate-900/5 p-14">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-600 uppercase">
            Sign In
          </h2>
          <div className="mb-8">
            <p className="mb-2 text-gray-500 text-md">Email</p>
            <input
              type="email"
              values={email}
              className="w-full px-2 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <p className="mb-2 text-gray-500 text-md">Password</p>
            </div>
            <input
              type="password"
              value={password}
              className="w-full px-2 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link href="/forgot-password">
            <a href="#" className="my-5 text-green-500 text-md">
              Forgot your password?
            </a>
          </Link>
          <button
            disabled={!email || loading}
            type="submit"
            className="w-full py-2 mt-4 bg-green-400 rounded-md hover:bg-green-500 text-gray-50"
          >
            {loading ? <SyncOutlined spin /> : "Login"}
          </button>
          <div className="max-w-xl mx-auto">
            <p className="mt-8 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register">
                <a className="text-green-500">Sign up</a>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
