import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (password != password2) {
        setLoading(false);
        toast.error("Password doesn't match");
        return;
      }

      const { data } = await axios.post(`/api/register`, {
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
      setLoading(false);
      toast.error(err.response.data);
    }
  };
  return (
    <section className="flex flex-col mt-3">
      <form
        onSubmit={handleSubmit}
        className="relative w-full login-box md:mx-auto z-100"
      >
        <div className="max-w-xl mx-auto mb-5 rounded-md shadow-2xl box ring-1 ring-slate-900/5 p-14 z-100">
          <div className="mb-5">
            <p className="mb-2 text-gray-500 text-md">Name</p>
            <input
              type="text"
              value={name}
              className="w-full px-2 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <p className="mb-2 text-gray-500 text-md">Email</p>
            <input
              type="email"
              value={email}
              className="w-full px-2 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
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
          <div className="mb-5">
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

export default Register;
