import React, { useState } from "react";
import Layout from "../components/Layout";
import { FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const UploadDataPage = () => {

  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMouse({
      x: e.clientX,
      y: e.clientY
    });
  };

  const simulateUpload = () => {
    setProgress(0);
    setUploaded(false);

    let value = 0;

    const interval = setInterval(() => {
      value += 10;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setUploaded(true);
      }

    }, 250);
  };

  return (
    <Layout>

      <motion.div
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen relative overflow-hidden
        bg-gradient-to-br from-[#020617] via-[#0b1120] to-[#000814]
        flex justify-center"
      >

        {/* GRID BACKGROUND */}

        <div className="absolute inset-0 opacity-[0.06] 
        bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),
        linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)]
        bg-[size:60px_60px]" />


        {/* FLOATING PARTICLES */}

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


        {/* CURSOR GLOW */}

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


        {/* GLOW ORBS */}

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-[160px]
          rounded-full top-[-150px] left-[-120px]"
        />

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-[160px]
          rounded-full bottom-[-150px] right-[-120px]"
        />

        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[150px]
          rounded-full top-[40%] left-[30%]"
        />


        <div className="w-full max-w-7xl px-6 py-16 relative">

          {/* HEADER */}

          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >

            <h1 className="
            text-4xl font-bold mb-3
            bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400
            bg-clip-text text-transparent
            drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]
            ">

              Upload Business Data

              <span className="
              ml-3 text-xs px-3 py-1 rounded-full
              bg-blue-500/20 text-blue-300
              border border-blue-400/30
              animate-pulse
              ">
                AI Powered
              </span>

            </h1>

            <p className="text-slate-400 text-sm max-w-xl">
              Upload datasets securely and let AI generate insights and predictions.
            </p>

          </motion.div>


          {/* MAIN GRID */}

          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 items-start">


            {/* UPLOAD PANEL */}

            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="
              backdrop-blur-xl
              bg-white/5
              border border-white/10
              rounded-2xl
              p-6
              shadow-xl
              hover:border-blue-400/40
              hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]
              transition duration-300
              "
            >

              {/* UPLOAD BOX */}

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="
                border-2 border-dashed border-slate-600
                rounded-xl p-10 text-center
                hover:border-cyan-400
                hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]
                transition duration-300
                cursor-pointer
                group
                relative
                "
              >

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaCloudUploadAlt
                    className="
                    text-5xl text-cyan-400 mx-auto mb-4
                    group-hover:scale-125
                    group-hover:-translate-y-1
                    transition duration-300
                    "
                  />
                </motion.div>

                <p className="text-white text-sm">
                  Drag & Drop your dataset
                </p>

                <p className="text-slate-400 text-xs mt-1">
                  or click to browse
                </p>


                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files[0]?.name)}
                />

                <label
                  htmlFor="fileUpload"
                  className="
                  block mt-4 text-xs text-cyan-400 cursor-pointer
                  hover:text-cyan-300
                  "
                >
                  Choose File
                </label>


                {/* FILE PREVIEW */}

                {fileName && (

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="
                    mt-5 text-xs text-cyan-300
                    bg-black/40 p-3 rounded-lg
                    border border-cyan-400/30
                    "
                  >
                    📄 {fileName}
                  </motion.div>

                )}


                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={simulateUpload}
                  className="
                  mt-6 px-6 py-2 rounded-lg
                  bg-gradient-to-r from-blue-500 to-cyan-400
                  text-white text-sm
                  hover:shadow-[0_0_20px_rgba(34,211,238,0.7)]
                  transition
                  "
                >
                  Upload & Analyze
                </motion.button>

              </motion.div>


              {/* PROGRESS */}

              {progress > 0 && progress < 100 && (

                <div className="mt-6">

                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">

                    <motion.div
                      className="
                      h-full
                      bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400
                      "
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />

                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="
                    w-6 h-6 border-2 border-cyan-400
                    border-t-transparent
                    rounded-full
                    animate-spin
                    "></div>
                  </div>

                </div>

              )}


              {/* SUCCESS */}

              {uploaded && (

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="
                  mt-6 flex items-center gap-3
                  text-green-400 text-sm
                  bg-green-500/10
                  border border-green-400/30
                  p-3 rounded-lg
                  shadow-[0_0_20px_rgba(34,197,94,0.3)]
                  "
                >

                  <FaCheckCircle className="text-lg"/>

                  Upload successful! Your dataset is ready for analysis.

                </motion.div>

              )}

            </motion.div>


            {/* INFO PANEL */}

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="
              backdrop-blur-xl
              bg-white/5
              border border-white/10
              rounded-2xl
              p-8
              shadow-xl
              hover:border-purple-400/40
              hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]
              hover:scale-[1.02]
              transition duration-300
              "
            >

              <h3 className="text-xl font-semibold text-white mb-6">
                Before you upload
              </h3>

              <ul className="space-y-4 text-slate-300 text-sm">

                <li>📊 Ensure data is clean & structured</li>
                <li>📁 Supported formats: CSV, Excel</li>
                <li>🧠 Used for KPI & prediction analysis</li>
                <li>🔒 Data is securely stored</li>

              </ul>

              <div className="
              mt-8 p-4 rounded-xl
              bg-blue-500/15
              border border-blue-400/30
              text-blue-300 text-sm
              backdrop-blur-md
              hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
              transition
              ">

                💡 Tip: Upload monthly sales or expense data for best predictions.

              </div>

            </motion.div>

          </div>

        </div>

      </motion.div>

    </Layout>
  );
};

export default UploadDataPage;