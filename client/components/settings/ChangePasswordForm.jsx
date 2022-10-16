import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../../context";
import { LOGOUT } from "../../context/types";

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const { dispatch } = useContext(Context);

  useEffect(() => {
    setError(null);
  }, [oldPassword, newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === "" || oldPassword === "" || confirmPassword === "") {
      return setError("Fields Can't be empty");
    } else if (newPassword != confirmPassword) {
      return setError("Password don't match");
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/server/user/changePassword", {
        oldPassword,
        confirmPassword,
      });
      setLoading(false);
      if (data?.success) {
        logout();
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };

  // logout function
  const logout = async () => {
    // sending a get request to backend
    const { data } = await axios.get("/server/logout");
    if (data.success) {
      // dispatch logout type
      dispatch({
        type: LOGOUT,
      });

      // remove user data from localStorage
      window.localStorage.removeItem("user");

      // redirect to login page
      router.push("/login");

      toast.success("Password Changed Successfully...");
    }
  };

  return (
    <div className="flex justify-center py-10">
      <form className="w-[30rem] space-y-5">
        <p className="px-2 py-2 text-red-600 " hidden={!error}>
          {error}
        </p>
        <div>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            className="w-full rounded-md"
            placeholder="Old Password"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            placeholder="New Password"
            className="w-full rounded-md"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 bg-[#5BC0BE] hover:text-white hover:scale-105 duration-200 rounded-lg shadow-lg "
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
