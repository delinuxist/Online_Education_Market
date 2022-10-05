import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../context";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSucces] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    state: { user },
  } = useContext(Context);

  // redirect if user is logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setSucces(data.success);
      toast.success("Check your email to proceed");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
      console.log(err.response.data.msg);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setCode("");
      setNewPassword("");
      setLoading(false);
      if (data.success) {
        toast.success("Successfully Changed Password...");
      }
      router.push("/login");
    } catch (err) {
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className={
          !success
            ? " h-[200px] w-[400px] bg-slate-50 shadow-2xl rounded-lg"
            : " h-[250px] w-[400px] bg-slate-50 shadow-2xl rounded-lg"
        }
      >
        <form
          onSubmit={!success ? handleSubmit : handleResetPassword}
          className="flex flex-col justify-center max-w-xl p-5 md:mx-auto"
        >
          <div className="w-full mx-auto ">
            <h1 className="pb-2 text-2xl font-bold text-center">
              Reset Password
            </h1>
            {!success ? (
              <input
                className="w-full p-2 my-2 rounded-md ring-1 ring-slate-600"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            ) : (
              <>
                <input
                  className="w-full p-2 my-2 rounded-md ring-1 ring-slate-600"
                  type="number"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter Code"
                />
                <input
                  className="w-full p-2 my-2 rounded-md ring-1 ring-slate-600"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                />
              </>
            )}

            {!success ? (
              <button
                disabled={loading || !email}
                className="bg-[#5BC0BE] rounded-lg py-2 w-full mt-4 text-white"
              >
                {loading ? <SyncOutlined spin /> : "Submit"}
              </button>
            ) : (
              <button
                disabled={loading || !code}
                className="bg-[#5BC0BE] rounded-lg py-2 w-full mt-4 text-white"
              >
                {loading ? <SyncOutlined spin /> : "Change Password"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
