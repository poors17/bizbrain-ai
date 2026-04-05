import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const resetPassword = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email, currentPassword, newPassword }
      );

      setMessage(res.data.message);

    } catch (err) {

      setMessage(err.response.data.message);

    }

  };

  return (
    <div className="p-10">

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        placeholder="Current Password"
        onChange={(e)=>setCurrentPassword(e.target.value)}
      />

      <input
        placeholder="New Password"
        onChange={(e)=>setNewPassword(e.target.value)}
      />

      <button onClick={resetPassword}>
        Reset Password
      </button>

      <p>{message}</p>

    </div>
  );
};

export default ForgotPassword;