import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { FaUpload, FaChartLine, FaFileAlt, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const UserDashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleMouseMove = (e) => {
    setMouse({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <Layout>

      <motion.div
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen relative overflow-hidden
        bg-gradient-to-br from-[#020617] via-[#0b1120] to-[#000814]"
      >

        {/* Animated Background Lines */}

        <div className="absolute inset-0 opacity-[0.06] 
        bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),
        linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)]
        bg-[size:60px_60px]" />

        {/* Floating Particles */}

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{ y: [0, -25, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}

        {/* Cursor Glow */}

        <motion.div
          className="pointer-events-none fixed w-[500px] h-[500px] rounded-full blur-[150px]"
          animate={{
            left: mouse.x - 250,
            top: mouse.y - 250
          }}
          transition={{ type: "spring", stiffness: 40 }}
          style={{
            background: "rgba(59,130,246,0.18)"
          }}
        />

        {/* Floating Background Lights */}

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-[160px] rounded-full top-[-150px] left-[-120px]"
        />

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-[160px] rounded-full bottom-[-150px] right-[-120px]"
        />

        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full top-[40%] left-[30%]"
        />

        <div className="max-w-7xl mx-auto px-6 py-16 relative">

          {/* HEADER */}

          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-20"
          >

            <div>

              <h1 className="text-5xl font-bold text-white tracking-tight">
                User Workspace
              </h1>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="
                mt-4 text-4xl font-extrabold
                bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400
                bg-clip-text text-transparent
                animate-pulse
                tracking-wide
                drop-shadow-[0_0_20px_rgba(59,130,246,0.9)]
                "
              >
                {user?.name || "User"}
              </motion.h2>

              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Your AI powered analytics workspace. Upload datasets,
                run predictions and generate intelligent reports.
              </p>

            </div>

            {/* USER CARD */}

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="
              flex items-center gap-4
              bg-white/[0.06] backdrop-blur-xl
              border border-white/10
              px-6 py-3 rounded-2xl
              shadow-xl
              hover:border-blue-400/40
              transition
              "
            >

              <FaUserCircle className="text-4xl text-blue-400"/>

              <div>
                <p className="text-white text-sm font-semibold">
                  {user?.name || "User"}
                </p>
                <p className="text-slate-400 text-xs">
                  Active User
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="
                ml-4 border border-red-500/40
                px-4 py-1.5 rounded-lg text-sm text-white
                hover:bg-red-500/20
                hover:border-red-400
                transition
                "
              >
                Logout
              </button>

            </motion.div>

          </motion.div>

          {/* ACTION CARDS */}

          <div className="grid md:grid-cols-3 gap-10">

            {[{
              icon: <FaUpload className="text-blue-400 text-3xl mb-6"/>,
              title: "Upload Data",
              text: "Upload datasets securely to begin analysis workflows.",
              route: "/upload-data",
              shadow: "rgba(59,130,246,0.5)"
            },
            {
              icon: <FaChartLine className="text-emerald-400 text-3xl mb-6"/>,
              title: "Predictions",
              text: "Generate intelligent predictions and discover trends.",
              route: "/prediction",
              shadow: "rgba(16,185,129,0.5)"
            },
            {
              icon: <FaFileAlt className="text-purple-400 text-3xl mb-6"/>,
              title: "Reports",
              text: "Explore analytical reports and performance summaries.",
              route: "/reports",
              shadow: "rgba(168,85,247,0.5)"
            }].map((card, i) => (

              <motion.div
                key={i}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.07 }}
                onClick={() => navigate(card.route)}
                className="
                relative group cursor-pointer
                rounded-2xl p-[2px]
                bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500
                transition duration-500
                "
              >

                <div className="
                rounded-2xl p-10
                bg-[#0f172a]
                border border-white/10
                h-full
                transform transition
                group-hover:-translate-y-2
                ">

                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {card.icon}
                  </motion.div>

                  <h3 className="text-xl text-white font-semibold mb-2">
                    {card.title}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {card.text}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </motion.div>

    </Layout>
  );
};

export default UserDashboard;