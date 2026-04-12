import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import BASE_URL from "../api";

import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showReset, setShowReset] = useState(false);
const [resetEmail, setResetEmail] = useState("");
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [resetMessage, setResetMessage] = useState("");
const [lockHours, setLockHours] = useState(null);

useEffect(() => {

  if (lockHours !== null) {

    const timer = setInterval(() => {

      setLockHours((prev) => {

        if (prev <= 1) {
          clearInterval(timer);
          return null;
        }

        return prev - 1;

      });

    }, 3600000);

  }

}, [lockHours]);

const handleLogin = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const res = await axios.post(
      `${BASE_URL}/api/auth/login`,
      { email, password }
    );

    localStorage.setItem("user", JSON.stringify(res.data));

    window.location.href =
      res.data.role === "ADMIN"
        ? "/admin-dashboard"
        : "/user-dashboard";

  } catch (err) {

    const msg = err.response?.data?.message || "Login failed";
    setMessage(msg);
  
    if (err.response?.data?.lockUntil) {
  
      const hours = Math.ceil(
        (err.response.data.lockUntil - Date.now()) / (1000 * 60 * 60)
      );
  
      setLockHours(hours);
  
    }
  
  }
};
const handleReset = async (e) => {
  e.preventDefault();
  setResetMessage("");

  try {

    const res = await axios.post(
      `${BASE_URL}/api/auth/reset-password`,
      {
        email: resetEmail,
        currentPassword,
        newPassword
      }
    );

    setResetMessage(res.data.message);

  } catch (err) {

    const msg = err.response?.data?.message || "Reset failed";

    setResetMessage(msg);

    if (msg.includes("Wait")) {
      const hours = msg.match(/\d+/)?.[0];
      setLockHours(hours);
    }

  }
};

return (
  <Layout>
   <section
  className="relative min-h-[calc(100vh-64px)] flex items-center justify-center bg-cover bg-center overflow-hidden px-4"
  style={{
    backgroundImage: "url('/images/analytics-bg.png')"
  }}
>
<div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/40 to-black/80"></div>

<div className="absolute inset-0 bg-black/20"></div>
   
<Particles
  id="tsparticles"
  init={async (main) => {
    await loadFull(main);
  }}
  options={{
    particles: {
      number: { value: 40 },
      color: { value: "#06b6d4" },
      links: {
        enable: true,
        color: "#06b6d4",
        distance: 150,
        opacity: 0.2
      },
      move: {
        enable: true,
        speed: 1
      },
      size: { value: 2 },
      opacity: { value: 0.3 }
    }
  }}
  className="absolute inset-0 -z-10 opacity-40"
/>

      {/* Background Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[160px] rounded-full top-[-120px] left-[-120px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full bottom-[-120px] right-[-120px]" />

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-slate-900/70 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.7)]"
      >
        <div className="absolute bottom-0 left-0 w-full h-16 opacity-20 pointer-events-none">
  <svg viewBox="0 0 500 100" className="w-full h-full">
    <polyline
      fill="none"
      stroke="#22d3ee"
      strokeWidth="3"
      points="0,80 60,60 120,70 180,40 240,50 300,20 360,40 420,10 480,30"
    >
      <animate
        attributeName="points"
        dur="5s"
        repeatCount="indefinite"
        values="
        0,80 60,60 120,70 180,40 240,50 300,20 360,40 420,10 480,30;
        0,70 60,80 120,60 180,50 240,30 300,40 360,20 420,40 480,20;
        0,80 60,60 120,70 180,40 240,50 300,20 360,40 420,10 480,30
        "
      />
    </polyline>
  </svg>
</div>

        {/* LOGO / BRAND */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-cyan-400 tracking-wide">
            BizBrain AI
          </h1>
          <p className="text-xs text-slate-400">
            Business Analytics & Prediction Platform
          </p>
        </div>

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white text-center mb-2"
        >
          Welcome Back
        </motion.h2>

        <p className="text-slate-400 text-center mb-8">
          Sign in to access analytics dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-900/80 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            />
          </motion.div>

          <motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.5 }}
  className="relative"
>

<div className="relative">

  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full  bg-slate-900/80 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>

</motion.div>

          {/* LOGIN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Login
          </motion.button>

        </form>

        {/* LOGIN ERROR */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-red-400 mt-5"
          >
            {message}
          </motion.p>
        )}

        {/* SIGNUP */}
        <p className="text-center text-slate-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Sign up
          </Link>
        </p>

        {/* FORGOT PASSWORD */}
        <p className="text-center text-sm mt-3">
          <button
            onClick={() => {
              setShowReset(true);
              setResetEmail(email);
            }}
            className="text-cyan-400 hover:underline"
          >
            Forgot Password?
          </button>
        </p>

      </motion.div>

      {/* RESET PASSWORD MODAL */}
      {showReset && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-[#020617] border border-white/10 rounded-xl p-8 w-96 shadow-xl">

            <h2 className="text-white text-xl font-bold mb-5 text-center">
              Reset Password
            </h2>

            <form onSubmit={handleReset} className="space-y-4">

              <input
                type="email"
                placeholder="Email"
                value={resetEmail}
                onChange={(e)=>setResetEmail(e.target.value)}
                className="w-full p-3 rounded bg-white/10 text-white border border-white/10"
              />

              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e)=>setCurrentPassword(e.target.value)}
                disabled={lockHours !== null}
                className={`w-full p-3 rounded text-white border border-white/10
                ${lockHours ? "bg-gray-600 cursor-not-allowed" : "bg-white/10"}`}
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                disabled={lockHours !== null}
                className={`w-full p-3 rounded text-white border border-white/10
                ${lockHours ? "bg-gray-600 cursor-not-allowed" : "bg-white/10"}`}
              />

              <button
                disabled={lockHours !== null}
                className={`w-full py-2 rounded font-semibold
                ${lockHours ? "bg-gray-600" : "bg-cyan-500 text-black"}`}
              >
                Reset Password
              </button>

            </form>

            {lockHours && (
              <p className="text-red-400 mt-4 text-sm text-center">
                Password reset disabled. Wait {lockHours} hours.
              </p>
            )}

            {resetMessage && !lockHours && (
              <p className="text-green-400 mt-4 text-sm text-center">
                {resetMessage}
              </p>
            )}

            <button
              onClick={() => setShowReset(false)}
              className="text-slate-400 text-sm mt-4 block mx-auto"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </section>
  </Layout>
);
};

export default Login;