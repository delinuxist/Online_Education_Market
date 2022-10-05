import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Context } from "../../context/index";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  // router
  const router = useRouter();

  // access state
  const { state } = useContext(Context);

  // destructuring user from state
  const { user } = state;

  // Redirect user to home page when logged in
  useEffect(() => {
    if (user !== null) router.push("/home");
  }, [router, user]);

  // Handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (password != password2) {
        setLoading(false);
        toast.error("Password doesn't match");
        return;
      }

      const { data } = await axios.post(`/server/register`, {
        name: name,
        email: email,
        password: password,
      });

      setLoading(false);

      if (data.success) {
        router.push("/login");
      }

      toast.success("Registrastion Successful");
    } catch (err) {
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };
  return (
    <section className="flex items-center justify-center w-screen h-screen ">
      <form onSubmit={handleSubmit} className="w-full lg:pt-[150px] md:mx-auto">
        <div className="max-w-xl mx-auto mb-2 rounded-md shadow-2xl p-14 box ring-1 ring-slate-900/5">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-600 uppercase">
            Sign Up
          </h2>
          <div className="mb-2">
            <p className="mb-2 text-gray-500 text-md">Name</p>
            <input
              type="text"
              value={name}
              className="w-full px-2 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <p className="mb-2 text-gray-500 text-md">Email</p>
            <input
              type="email"
              value={email}
              className="w-full px-2 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
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
          <div className="mb-2">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <p className="mb-2 text-gray-500 text-md">Confirm Password</p>
            </div>
            <input
              type="password"
              value={password2}
              className="w-full px-2 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <a href="#" className="my-5 text-green-500 text-md">
            Forgot your password?
          </a>

          <button
            disabled={!name || !email || loading}
            type="submit"
            className="w-full py-2 mt-4 bg-green-400 rounded-md hover:bg-green-500 text-gray-50"
          >
            {loading ? <SyncOutlined spin /> : "Register"}
          </button>
          <div className="max-w-xl mx-auto">
            <p className="mt-3 text-sm">
              Already have an account?{" "}
              <Link href="/login">
                <a className="text-green-500">Login</a>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;
