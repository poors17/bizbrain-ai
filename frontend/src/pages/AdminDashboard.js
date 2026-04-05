import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMouse({
      x: e.clientX,
      y: e.clientY
    });
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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

{/* FLOATING LIGHT ORBS */}

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

        {/* OUTER WRAPPER */}
        <div className="w-full max-w-7xl px-6 py-16">

          {/* HEADER ROW */}
          <div className="flex items-center justify-between mb-16 animate-fadeIn">

            {/* LEFT */}
            <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white tracking-tight">
  Admin Control Center
</h1>

<motion.h2
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.3 }}
className="
mt-4 text-3xl font-extrabold
bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400
bg-clip-text text-transparent
animate-pulse
tracking-wide
drop-shadow-[0_0_20px_rgba(59,130,246,0.9)]
"
>
{user?.name || "Admin"}
</motion.h2>

              

              <p className="text-slate-400 text-sm mt-3">
                Monitor, manage, and optimize the BizBrain AI platform using
                enterprise-grade administrative tools.
              </p>
            </div>

            {/* RIGHT */}
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

<div className="text-4xl text-blue-400">
👤
</div>

<div>
<p className="text-white text-sm font-semibold">
{user?.name || "Admin"}
</p>

<p className="text-slate-400 text-xs">
Active Admin
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
          </div>

          {/* CARDS – PERFECT CENTER */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10
                          justify-items-center text-center">

<div
  onClick={() => navigate("/admin/users")}
  className="relative group cursor-pointer
rounded-2xl p-[2px]
bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500
transition duration-500
hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
  
>

  <div
    className="
    rounded-2xl p-10
    bg-[#0f172a]
    border border-white/10
    h-full
    transform transition
    group-hover:-translate-y-2
    text-center
    "
  >

    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-16 h-16 mx-auto mb-6
      flex items-center justify-center
      rounded-full bg-cyan-400/20 text-3xl"
    >
      👥
    </motion.div>

    <h3 className="text-xl font-semibold text-white mb-2">
      User Management
    </h3>

    <p className="text-slate-300 text-sm leading-relaxed">
      Manage users, assign roles, and control platform access securely.
    </p>

  </div>

</div>

           {/* ANALYTICS */}
<div
onClick={() => navigate("/admin/analytics")}
className="
relative group cursor-pointer
rounded-2xl p-[2px]
bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500
transition duration-500
"
>

<div
className="
rounded-2xl p-10
bg-[#0f172a]
border border-white/10
h-full
transform transition
group-hover:-translate-y-2
text-center
"
>

<motion.div
animate={{ y: [0, -6, 0] }}
transition={{ duration: 2, repeat: Infinity }}
className="w-16 h-16 mx-auto mb-6
flex items-center justify-center
rounded-full bg-blue-400/20 text-3xl"
>
📊
</motion.div>

<h3 className="text-xl font-semibold text-white mb-2">
Analytics Dashboard
</h3>

<p className="text-slate-300 text-sm leading-relaxed">
Visualize performance metrics and AI-driven business insights.
</p>

</div>
</div>
            {/* CONFIG */}
<div
onClick={() => navigate("/admin/config")}
className="
relative group cursor-pointer
rounded-2xl p-[2px]
bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500
transition duration-500
"
>

<div
className="
rounded-2xl p-10
bg-[#0f172a]
border border-white/10
h-full
transform transition
group-hover:-translate-y-2
text-center
"
>

<motion.div
animate={{ y: [0, -6, 0] }}
transition={{ duration: 2, repeat: Infinity }}
className="w-16 h-16 mx-auto mb-6
flex items-center justify-center
rounded-full bg-purple-400/20 text-3xl"
>
⚙️
</motion.div>

<h3 className="text-xl font-semibold text-white mb-2">
System Configuration
</h3>

<p className="text-slate-300 text-sm leading-relaxed">
Configure security policies and core system preferences.
</p>

</div>
</div>

          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default AdminDashboard;
