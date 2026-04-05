import React, { useState } from "react";
import Layout from "../components/Layout";
import { FaUser, FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      setMessage(res.data.message || "Account created successfully");
      setForm({ name: "", email: "", password: "", role: "USER" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
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
  
        {/* Animated Card */}
        <motion.div
  initial={{ opacity: 0, y: 40, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="relative z-10 w-full max-w-md bg-slate-900/70 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.7)]"

>

{/* Animated analytics wave */}
<div className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none z-0">

<svg viewBox="0 0 1440 320">

<path
fill="#22d3ee"
fillOpacity="0.2"
d="M0,160L60,170C120,180,240,200,360,186.7C480,173,600,127,720,117.3C840,107,960,133,1080,144C1200,155,1320,149,1380,144L1440,139L1440,320L0,320Z"
>

<animate
attributeName="d"
dur="8s"
repeatCount="indefinite"
values="
M0,160L60,170C120,180,240,200,360,186.7C480,173,600,127,720,117.3C840,107,960,133,1080,144C1200,155,1320,149,1380,144L1440,139L1440,320L0,320Z;
M0,170L60,150C120,130,240,110,360,133C480,160,600,240,720,245C840,250,960,180,1080,150C1200,120,1320,140,1380,150L1440,160L1440,320L0,320Z;
M0,160L60,170C120,180,240,200,360,186.7C480,173,600,127,720,117.3C840,107,960,133,1080,144C1200,155,1320,149,1380,144L1440,139L1440,320L0,320Z
"
/>

</path>

</svg>

</div>
{/* BRAND */}
<div className="text-center mb-6">
  <h1 className="text-2xl font-bold text-cyan-400 tracking-wide">
    BizBrain AI
  </h1>
  <p className="text-xs text-slate-400">
    Business Analytics & Prediction Platform
  </p>
</div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white text-center mb-2"
          >
            Create Account
          </motion.h2>

          <p className="text-slate-400 text-center mb-8">
            Access BizBrain AI analytics platform
          </p>
          

          <form onSubmit={handleRegister} className="space-y-5">

            {/* NAME */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/80 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition"
              />
            </motion.div>

            {/* EMAIL */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition"
              />
            </motion.div>

            {/* PASSWORD */}
            <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.5 }}
  className="relative"
>

<FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

<input
  type={showPassword ? "text" : "password"}
  name="password"
  placeholder="Password"
  value={form.password}
  onChange={handleChange}
  required
  className="w-full bg-transparent border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
/>

<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
>
{showPassword ? <FaEyeSlash /> : <FaEye />}
</button>

</motion.div>

            {/* ROLE */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <FaUserShield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-[#020617] border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </motion.div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </motion.button>

          </form>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-cyan-400 mt-5"
            >
              {message}
            </motion.p>
          )}

          <p className="text-center text-slate-400 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Login
            </Link>
          </p>

        </motion.div>
      </section>
    </Layout>
  );
};

export default Register;