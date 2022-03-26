import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email: email,
        password: password,
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <section className="flex flex-col mt-8">
      <form
        onSubmit={handleSubmit}
        className="relative w-full login-box md:mx-auto z-100"
      >
        <div className="max-w-xl mx-auto rounded-md shadow-2xl box ring-1 ring-slate-900/5 p-14 z-100">
          <h2 className="mb-8 text-2xl font-bold text-gray-600">Sign In</h2>
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
          <a href="#" className="my-5 text-green-500 text-md">
            Forgot your password?
          </a>

          <button
            disabled={!email || loading}
            type="submit"
            className="w-full py-2 mt-4 bg-green-400 rounded-md hover:bg-green-500 text-gray-50"
          >
            {loading ? <SyncOutlined spin /> : "Login"}
          </button>
        </div>

        <div className="max-w-xl mx-auto">
          <p className="mt-8 ml-8 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register">
              <a className="text-green-500">Sign up</a>
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
