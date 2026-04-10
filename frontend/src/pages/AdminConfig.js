import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import BASE_URL from "../api";
const AdminConfig = () => {

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMouse({
      x: e.clientX,
      y: e.clientY
    });
  };

  const [config, setConfig] = useState({
    autoApprove: true,
    allowRegistration: true,
    enableReports: true,
    enablePrediction: true,
    userApprovalRequired: false,
    accuracyThreshold: 70,
    predictionMode: "Balanced",
    minRows: 4,
    maxLoginAttempts: 5
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/api/system-config`)
      .then(res => {
        if (res.data) setConfig(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSave = async () => {
    try {
      await axios.put(`${BASE_URL}/api/system-config`, config);
      alert("Settings Saved Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to save settings");
    }
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

{/* FLOATING BUBBLES */}

{[...Array(20)].map((_, i) => (
<motion.div
key={i}
className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
animate={{ y: [0, -25, 0] }}
transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
style={{
top: `${Math.random() * 100}%`,
left: `${Math.random() * 100}%`
}}
/>
))}

{/* MOUSE GLOW */}

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

<div className="w-full max-w-5xl mx-auto px-6 pt-12 pb-24 space-y-8 animate-fadeIn">

{/* HEADER */}

<div>
<h1 className="text-4xl font-extrabold text-white mb-2">
System Configuration
</h1>

<p className="text-slate-400 text-sm max-w-xl">
Manage core system rules, security controls, and AI prediction behavior.
</p>
</div>

{/* ================= PREDICTION SETTINGS ================= */}

<Card title="Prediction Settings">

<label className="block text-sm text-slate-300 mb-2">
Accuracy Threshold (%)
</label>

<input
type="number"
min="0"
max="100"
value={config.accuracyThreshold}
onChange={(e) =>
setConfig({
...config,
accuracyThreshold: Number(e.target.value)
})
}
className={input}
/>

<p className="text-xs text-slate-400 mt-2 mb-6">
Minimum accuracy required for predictions to be considered valid.
</p>

<Toggle
label="Auto-approve predictions"
enabled={config.autoApprove}
onToggle={() =>
setConfig({ ...config, autoApprove: !config.autoApprove })
}
/>

</Card>

{/* ================= USER CONTROLS ================= */}

<Card title="User Controls">

<label className="block text-sm text-slate-300 mb-2">
Max Login Attempts
</label>

<input
type="number"
min="1"
value={config.maxLoginAttempts}
onChange={(e) =>
setConfig({
...config,
maxLoginAttempts: Number(e.target.value)
})
}
className={input}
/>

<Toggle
label="Allow new user registration"
enabled={config.allowRegistration}
onToggle={() =>
setConfig({ ...config, allowRegistration: !config.allowRegistration })
}
/>

<div className="mt-4">

<Toggle
label="Require admin approval for new users"
enabled={config.userApprovalRequired}
onToggle={() =>
setConfig({
...config,
userApprovalRequired: !config.userApprovalRequired
})
}
/>

</div>

</Card>

{/* ================= SECURITY CONTROLS ================= */}

<Card title="Security Controls">

<Toggle
label="Enable CSV downloads"
enabled={config.enableReports}
onToggle={() =>
setConfig({ ...config, enableReports: !config.enableReports })
}
/>

<div className="mt-4">

<Toggle
label="Enable prediction module"
enabled={config.enablePrediction}
onToggle={() =>
setConfig({ ...config, enablePrediction: !config.enablePrediction })
}
/>

</div>

</Card>

{/* ACTION BUTTONS */}

<div className="flex gap-6 pt-4">

<button
onClick={handleSave}
className="px-8 py-3 rounded-full
bg-gradient-to-r from-emerald-500 to-green-400
text-white font-semibold
shadow-lg hover:scale-105
hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]
transition-all"
>
Save Changes
</button>

<button
className="px-8 py-3 rounded-full border border-white/30
text-white hover:bg-white/10 transition"
>
Reset
</button>

</div>

</div>
</motion.div>
</Layout>
);
};

/* ================= CARD COMPONENT ================= */

const Card = ({ title, children }) => (

<div className="group relative p-[1px] rounded-3xl
bg-gradient-to-r from-blue-500/20 via-cyan-400/10 to-blue-500/20
hover:from-blue-400/40 hover:via-cyan-400/30 hover:to-blue-400/40
transition-all duration-500">

<div className="bg-[#020617]/80 backdrop-blur-xl rounded-3xl p-8
shadow-[0_20px_60px_rgba(0,0,0,0.7)]
group-hover:shadow-[0_0_40px_rgba(56,189,248,0.4)]
hover:-translate-y-1 transition-all">

<h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">

<span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>

{title}

<div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-400/40 to-transparent"></div>

</h3>

{children}

</div>
</div>

);

/* ================= INPUT STYLE ================= */

const input =
"w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition";

/* ================= TOGGLE ================= */

const Toggle = ({ label, enabled, onToggle }) => (

<div className="flex items-center justify-between py-2">

<span className="text-slate-300 text-sm">{label}</span>

<button
onClick={onToggle}
className={`w-14 h-7 flex items-center rounded-full p-1
transition-all duration-300
${enabled
? "bg-gradient-to-r from-emerald-500 to-green-400 shadow-[0_0_10px_rgba(34,197,94,0.6)]"
: "bg-slate-600"}`}
>

<div
className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-all duration-300
${enabled ? "translate-x-7" : "translate-x-0"}`}
/>

</button>

</div>

);

export default AdminConfig;