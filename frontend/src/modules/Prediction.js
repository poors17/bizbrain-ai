import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

import { runPrediction } from "../services/predictionService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const algorithmLabels = {
  r2sp: "Recent Weighted Pattern",
  iwpa: "Insight Weighted Prediction Adjustment",
  tmsa: "Trend Momentum Shift Analysis",
  rapa: "Risk Adjusted Performance Analysis"
};

const formatNumber = (value) =>
  value?.toLocaleString("en-IN");

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBestModal, setShowBestModal] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  setMouse({
    x: e.clientX,
    y: e.clientY
  });
};


  const handlePredict = async () => {
    if (!selectedFile) {
      setError("⚠️ Please upload a CSV file");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await runPrediction(selectedFile);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    
      if (err.response?.status === 403) {
        setError("🚫 Prediction module is disabled by admin.");
      } else if (err.response?.status === 400) {
        setError(err.response.data?.message || "Invalid input data.");
      } else {
        setError("❌ Prediction failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const bestKey = result
  ? result?.bestAlgorithm?.toLowerCase() ||
    Object.keys(algorithmLabels).sort(
      (a, b) => (result?.[b]?.accuracy || 0) - (result?.[a]?.accuracy || 0)
    )[0]
  : null;


  const getTrendArrow = (value) => {
    if (!value) return "➖";
    return value > 0 ? "🔼" : "🔽";
  };

  const chartData = result
    ? Object.keys(algorithmLabels).map((key) => ({
        name: key.toUpperCase(),
        profit: result[key]?.profit || 0,
        accuracy: result[key]?.accuracy || 0
      }))
    : [];
  
    // 🔥 NEW FEATURE LOGIC
    let healthScore = 0;
    let healthStatus = "";
    let healthColor = "";
    let recommendation = "";
  
    if (bestKey && result) {
      const best = result[bestKey];
  
      healthScore =
        best.accuracy * 0.6 +
        (best.profit > 0 ? 100 : 40) * 0.4;
        
      if (healthScore >= 85) {
        healthStatus = "Excellent Growth Condition";
        healthColor = "text-emerald-400";
      } else if (healthScore >= 70) {
        healthStatus = "Stable Business";
        healthColor = "text-yellow-400";
      } else if (healthScore >= 50) {
        healthStatus = "Moderate Risk";
        healthColor = "text-orange-400";
      } else {
        healthStatus = "High Risk Situation";
        healthColor = "text-red-400";
      }
  
      if (best.profit > 40000) {
        recommendation =
          "Strong profit trend detected. Consider expanding operations and scaling investments.";
      } else if (best.profit < 0) {
        recommendation =
          "Loss predicted. Immediate cost optimization and strategy revision required.";
      } else {
        recommendation =
          "Business is stable. Maintain steady operations and monitor fluctuations.";
      }
    }

  return (
    <Layout>
      <motion.div
onMouseMove={handleMouseMove}
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.6 }}

className="
min-h-screen
relative
overflow-hidden
bg-gradient-to-br
from-[#020617]
via-[#020f2e]
to-[#000814]
flex justify-center
text-white
"
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
    className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-70"
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

<h1 className="text-4xl font-bold mb-12 tracking-tight
bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300
bg-clip-text text-transparent
drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]">
 Multi-Algorithm Prediction Dashboard
</h1>
        
          {/* UPLOAD */}
<div className="flex items-center gap-6 mb-16">

{/* Custom File Button */}
<label className="px-6 py-2 rounded-full bg-slate-800 text-white cursor-pointer hover:bg-slate-700 transition">
  Choose File
  <input
    type="file"
    accept=".csv"
    onChange={(e) => setSelectedFile(e.target.files[0])}
    className="hidden"
  />
</label>

{/* File Name Display */}
<span className="text-slate-300">
  {selectedFile ? selectedFile.name : "No file chosen"}
</span>

<button
  onClick={handlePredict}
  disabled={loading}
  className="px-8 py-3 rounded-full
  bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400
shadow-[0_0_20px_rgba(34,211,238,0.6)]
hover:scale-105 transition-all duration-300
  text-slate-900 font-semibold"
>
  {loading ? "Running..." : "Run Prediction"}
</button>

</div>

          {error && <p className="text-red-400 mb-6">{error}</p>}

          {result && (
            <>
              {/* 🏆 BEST MODEL */}
              <div className="p-8 rounded-2xl
backdrop-blur-xl
bg-emerald-500/10
border border-emerald-400/40
shadow-[0_0_40px_rgba(34,197,94,0.3)]
mb-16">
                <h3 className="text-white font-semibold mb-2">
                  🏆 Best Performing Model
                </h3>
                <p className="text-emerald-300 text-2xl font-bold">
                  {algorithmLabels[bestKey]}
                </p>
              </div>
              
              {/* 🧠 BUSINESS HEALTH */}
              <div className="p-8 rounded-2xl backdrop-blur-xl
bg-blue-500/10
border border-blue-400/40
shadow-[0_0_35px_rgba(59,130,246,0.3)] mb-10">
                <h3 className="text-white font-semibold mb-2">
                  🧠 Business Health Score
                </h3>
                <p className="text-2xl font-bold text-blue-400">
                  {Math.round(healthScore)} / 100
                </p>
                <p className={`mt-2 ${healthColor}`}>
                  {healthStatus}
                </p>
              </div>

              {/* 📌 SMART RECOMMENDATION */}
              <div className="p-8 rounded-2xl backdrop-blur-xl
bg-cyan-500/10
border border-cyan-400/40
shadow-[0_0_35px_rgba(34,211,238,0.3)] mb-16">
                <h3 className="text-white font-semibold mb-3">
                  📌 AI Smart Recommendation
                </h3>
                <p className="text-white">{recommendation}</p>
              </div>
              
              {/* 🔥 EACH ALGORITHM ROW WITH 4 BOXES */}
              <div className="space-y-20">

                {Object.keys(algorithmLabels).map((key) => {
                  const data = result[key];

                  return (
                    <div key={key}>

                      {/* Algorithm Title */}
                      <h3 className="text-xl font-bold mb-8
text-cyan-300
drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                        {algorithmLabels[key]}
                      </h3>

                      {/* 4 Stat Boxes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                        {/* Sales */}
                        <StatBox
                          title="Predicted Sales"
                          value={`₹ ${formatNumber(data?.sales || 0)}`}
                          highlight={bestKey === key}
                        />

                        {/* Expense */}
                        <StatBox
                          title="Predicted Expense"
                          value={`₹ ${formatNumber(data?.expense || 0)}`}
                          highlight={bestKey === key}
                        />

                        {/* Profit */}
                        <StatBox
                          title="Expected Profit"
                          value={`₹ ${formatNumber(data?.profit || 0)} ${getTrendArrow(data?.profit)}`}
                          highlight={bestKey === key}
                        />

                        {/* Accuracy */}
                        <StatBox
                          title="Accuracy"
                          value={`${data?.accuracy || 0}%`}
                          highlight={bestKey === key}
                        />

                      </div>
                    </div>
                  );
                })}

              </div>

              {/* 📈 COMPARISON TABLE */}
              {/* 📊 PROFESSIONAL ALGORITHM COMPARISON TABLE */}
<div className="mt-24 p-10 rounded-3xl 
bg-gradient-to-br from-slate-800/70 to-slate-900/70 
border border-white/10 shadow-2xl">

  <h3 className="text-xl font-semibold text-white mb-8">
    Professional Algorithm Comparison
  </h3>

  <div className="overflow-x-auto">
    <table className="w-full text-sm text-slate-300">

    <thead>
  <tr className="border-b border-white/10 text-slate-400 uppercase text-xs tracking-wider">
    <th className="py-4 text-left w-16">Rank</th>
    <th className="text-left">Algorithm</th>
    <th className="text-center">Sales</th>
    <th className="text-center">Expense</th>
    <th className="text-center">Profit</th>
    <th className="text-center">Accuracy %</th>
    <th className="text-center">Confidence %</th>
    <th className="text-center">Risk Level</th>
  </tr>
</thead>
<tbody>
  {Object.keys(algorithmLabels)
    .sort((a, b) => (result[b]?.accuracy || 0) - (result[a]?.accuracy || 0))
    .map((key, index) => {

      const accuracy = result[key]?.accuracy || 0;

      // Dynamic confidence (if backend doesn't send)
      const confidence =
        result[key]?.confidence ??
        (accuracy >= 85 ? 90 :
         accuracy >= 70 ? 80 :
         accuracy >= 50 ? 65 : 40);

      const risk =
        accuracy >= 80 ? "Low" :
        accuracy >= 50 ? "Medium" : "High";

      return (
        <tr
          key={key}
          className={`border-b border-white/5 transition-all duration-300
          ${bestKey === key
            ? "bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(34,255,170,0.6)] font-semibold"
            : "hover:bg-white/5"
          }`}
        >

          {/* Rank */}
          <td className="py-4 font-semibold">
            #{index + 1}
          </td>

          {/* Algorithm Name */}
          <td className="py-4">
            {algorithmLabels[key]}
          </td>

          {/* Sales */}
          <td className="text-center">
          ₹ {formatNumber(result[key]?.sales || 0)}
          </td>

          {/* Expense */}
          <td className="text-center">
          ₹ {formatNumber(result[key]?.expense || 0)}
          </td>

          {/* Profit */}
          <td className="text-center font-medium">
          ₹ {formatNumber(result[key]?.profit || 0)}
          </td>

          {/* Accuracy */}
          <td className="text-center">
            {accuracy}%
          </td>

          {/* Confidence */}
          <td className="text-center">
            {confidence}%
          </td>

          {/* Risk Level */}
          <td className="text-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
                ${risk === "Low" && "bg-emerald-500/20 text-emerald-400"}
                ${risk === "Medium" && "bg-yellow-500/20 text-yellow-400"}
                ${risk === "High" && "bg-red-500/20 text-red-400"}
              `}
            >
              {risk}
            </span>
          </td>

        </tr>
      );
    })}
</tbody>


    </table>
  </div>

</div>
              {/* 📊 BAR CHART */}
              <div className="mt-20 p-8 rounded-2xl
backdrop-blur-xl
bg-white/5
border border-white/10
shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Performance Comparison
                </h3>

                <ResponsiveContainer width="100%" height={350}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
    <XAxis dataKey="name" stroke="#cbd5f5" />

    {/* Left Y Axis - Profit */}
    <YAxis yAxisId="left" stroke="#22c55e" />

    {/* Right Y Axis - Accuracy */}
    <YAxis
      yAxisId="right"
      orientation="right"
      domain={[0, 100]}
      stroke="#3b82f6"
    />

    <Tooltip />

    {/* Profit Bar */}
    <Bar yAxisId="left" dataKey="profit" fill="#22c55e" />

    {/* Accuracy Bar */}
    <Bar yAxisId="right" dataKey="accuracy" fill="#3b82f6" />
  </BarChart>
</ResponsiveContainer>
              </div>
            {/* 🔥 Best Prediction Button */}
<div className="mt-10 text-center">
  <button
    onClick={() => setShowBestModal(true)}
    className="px-8 py-3 rounded-full
    bg-gradient-to-r from-emerald-500 to-green-400
    text-slate-900 font-semibold
    hover:scale-105 transition-all duration-300"
  >
    Show Best Prediction Algorithm
  </button>
</div>
          {/* MODAL */}
{showBestModal && bestKey && result && (

<div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 overflow-hidden">

{/* FIREWORK EXPLOSION */}

{/* Flash explosion */}
<motion.div
initial={{ scale:0, opacity:1 }}
animate={{ scale:4, opacity:0 }}
transition={{ duration:0.6 }}
className="absolute w-40 h-40 bg-yellow-300/40 rounded-full blur-3xl"
/>


{/* CONFETTI CELEBRATION */}

{[...Array(40)].map((_, i) => (
<motion.div
key={"confetti"+i}

className="absolute w-3 h-3 rounded-sm"

style={{
left:`${Math.random()*100}%`,
top:"-10px",
background:[
"#22c55e",
"#38bdf8",
"#facc15",
"#fb7185",
"#a78bfa"
][Math.floor(Math.random()*5)]
}}

initial={{
y:-100,
rotate:0,
opacity:1
}}

animate={{
y:600,
rotate:360,
opacity:[1,1,0]
}}

transition={{
duration:4,
delay:i*0.05,
ease:"linear"
}}
/>
))}

{/* Floating sparks */}
{[...Array(20)].map((_,i)=>(
<motion.div
key={"spark"+i}
className="absolute w-2 h-2 bg-yellow-300 rounded-full"

animate={{
y:[0,-200,0],
opacity:[0.2,1,0.2]
}}

transition={{
duration:3,
repeat:Infinity,
delay:i*0.2
}}

style={{
left:`${Math.random()*100}%`,
top:`${Math.random()*100}%`,
boxShadow:"0 0 10px #ff0"
}}
/>
))}

<div className="bg-slate-900/80 backdrop-blur-xl p-10 rounded-3xl w-full max-w-2xl border border-emerald-400/40 shadow-[0_0_60px_rgba(34,197,94,0.4)] relative">

<button
onClick={() => setShowBestModal(false)}
className="absolute top-4 right-4 text-slate-400 hover:text-white"
>
✖
</button>

<motion.h2
initial={{ scale: 0.7, rotate: -10 }}
animate={{ scale: 1, rotate: 0 }}
transition={{ type: "spring", stiffness: 120 }}
className="text-3xl font-bold text-emerald-400 mb-6 flex items-center gap-3"
>

<motion.span
animate={{ rotate: [0, 15, -15, 0] }}
transition={{ duration: 1.5, repeat: Infinity }}
>
🏆
</motion.span>

Best Prediction Algorithm

</motion.h2>

<p className="text-3xl text-emerald-300 font-bold mb-6 text-center drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">
{algorithmLabels[bestKey]}
</p>

<div className="space-y-3 text-slate-300">

<p>Predicted Sales: ₹ {formatNumber(result[bestKey]?.sales)}</p>

<p>Predicted Expense: ₹ {formatNumber(result[bestKey]?.expense)}</p>

<p>Expected Profit: ₹ {formatNumber(result[bestKey]?.profit)}</p>

<p>Accuracy: {result[bestKey]?.accuracy}%</p>

<p>Confidence: {result[bestKey]?.confidence || 0}%</p>

</div>

<div className="mt-6 p-4 rounded-xl bg-slate-800 border border-white/10">

<p className="text-slate-400 text-sm mb-2">
Why this model is best?
</p>

<p className="text-white text-sm">
This algorithm achieved the highest accuracy and maximum profit compared to other models while maintaining optimized expense and reduced risk.
</p>

</div>

</div>

</div>

)}

            </>
          )}

        </div>
        </motion.div>
    </Layout>
  );
};

/* 🔹 Reusable Stat Box Component */
const StatBox = ({ title, value, highlight }) => (

  <div
  className={`
  p-6
  rounded-2xl
  backdrop-blur-xl
  bg-white/5
  border border-white/10
  shadow-xl
  transition-all duration-300
  
  hover:scale-105
  hover:border-cyan-400/40
  hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]
  
  ${highlight ?
    "bg-emerald-500/20 border-emerald-400 shadow-[0_0_60px_rgba(34,255,170,0.9)] scale-105 ring-2 ring-emerald-400"
    : ""}
  `}
  >
  
  <p className="text-slate-300 text-sm mb-3 font-medium">
  {title}
  </p>
  
  <h2 className="text-3xl font-bold text-white tracking-wide">
  {value}
  </h2>
  
  </div>
  
  );
  

export default Prediction;