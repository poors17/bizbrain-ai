import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { getReports } from "../services/reportService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Reports = () => {
  const [reports, setReports] = useState([]);
const [reportData, setReportData] = useState({});
const [loading, setLoading] = useState(true);
const [mouse, setMouse] = useState({ x: 0, y: 0 });


  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await getReports();
  
      console.log(res.data.reports); // ADD THIS
  
      setReportData(res.data);

const processedReports = (res.data.reports || []).map(r => ({
  ...r,
  profitValue: r[r.bestAlgorithm]?.profit || 0
}));

setReports(processedReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
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
initial={{ opacity:0 }}
animate={{ opacity:1 }}
transition={{ duration:0.6 }}
className="min-h-screen relative overflow-hidden
bg-gradient-to-br from-[#020617] via-[#020f2e] to-[#000814]"
>
  {/* GRID BACKGROUND */}

<div className="absolute inset-0 opacity-[0.05]
bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),
linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)]
bg-[size:60px_60px]" />

{/* FLOATING PARTICLES */}

{[...Array(20)].map((_,i)=>(
<motion.div
key={i}
className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-70"
animate={{ y:[0,-25,0] }}
transition={{
duration:4,
repeat:Infinity,
delay:i*0.2
}}
style={{
top:`${Math.random()*100}%`,
left:`${Math.random()*100}%`
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
      <div className="w-full max-w-7xl mx-auto px-6 py-16">

          {/* HEADER */}
          <div className="mb-14">
          <h1 className="text-4xl font-bold mb-2
bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300
bg-clip-text text-transparent
drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
📄 Reports & Insights
</h1>
            <p className="text-slate-400 text-sm max-w-xl">
              View analytics summaries, prediction reports, and system insights.
            </p>
          </div>

          {/* SUMMARY CARDS */}
          
          
           {/* ANALYTICS CARDS */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

<SummaryCard
label="📊 Total Predictions"
value={reportData.totalPredictions || 0}
/>

<SummaryCard
label="🎯 Average Accuracy"
value={`${reportData.avgAccuracy || 0}%`}
/>

<SummaryCard
label="💰 Average Profit"
value={`₹ ${reportData.avgProfit || 0}`}
/>

<SummaryCard
label="🏆 Best Algorithm"
value={(reportData.bestAlgorithm || "—").toUpperCase()}
/>

</div>
          

          {/* REPORT TABLE */}
          {/* PROFIT TREND CHART */}

          <div className="
p-8
rounded-2xl
backdrop-blur-xl
bg-white/5
border border-white/10
shadow-[0_0_30px_rgba(59,130,246,0.2)]
mb-12">

<h3 className="text-lg font-semibold text-white mb-6">
Profit Trend
</h3>

<ResponsiveContainer width="100%" height={250}>

<BarChart data={reports}>

<XAxis
dataKey="createdAt"
tickFormatter={(v)=> new Date(v).toLocaleDateString()}
tick={{ fill: "#94a3b8" }}
/>

<YAxis />
<YAxis tick={{ fill: "#94a3b8" }} />

<Tooltip
formatter={(value)=>`₹ ${value}`}
labelFormatter={(v)=> new Date(v).toLocaleDateString()}
/>

<Bar
dataKey="profitValue"
fill="#22c55e"
minPointSize={5}
/>
</BarChart>

</ResponsiveContainer>

</div>
          <div className="glass-card p-6">

            <h3 className="text-lg font-semibold text-white mb-6">
              Generated Reports
            </h3>

            {loading ? (
              <p className="text-slate-400">Loading...</p>
            ) : reports.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-sm">
                No reports generated yet.
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <div
                    key={index}
                    className="
p-5
rounded-xl
backdrop-blur-xl
bg-white/5
border border-white/10
text-white
hover:border-emerald-400/40
transition-all duration-300
"
                  >
                    <p>
                      <strong>Best Algorithm:</strong>{" "}
                      {report.bestAlgorithm?.toUpperCase()}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(report.createdAt).toLocaleString()}
                    </p>

                    <p>
<strong>Profit:</strong>{" "}
₹ {report[report.bestAlgorithm]?.profit}
</p>
                  </div>
                ))}
              </div>
            )}

          </div>
{/* AI BUSINESS INSIGHT */}

<div className="
p-6
rounded-2xl
backdrop-blur-xl
bg-emerald-500/10
border border-emerald-400/30
shadow-[0_0_40px_rgba(34,197,94,0.3)]
mt-12">

<h3 className="text-lg font-semibold text-white mb-4">
🧠 AI Business Insight
</h3>

<p className="text-slate-300 text-sm leading-relaxed">

Your business is currently in an excellent growth stage.

The <strong>{reportData.bestAlgorithm}</strong> algorithm provides the highest prediction accuracy.

Maintaining the current strategy is recommended for stable growth.

</p>

</div>
        </div>
        </motion.div>
    </Layout>
  );
};

/* SUMMARY CARD */

const SummaryCard = ({ label, value }) => (
  <div className="
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
  ">
  
  <p className="text-slate-400 text-sm">{label}</p>
  
  <h2 className="text-3xl font-bold text-cyan-300 mt-3
  drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
  {value}
  </h2>
  
  </div>
  );

export default Reports;