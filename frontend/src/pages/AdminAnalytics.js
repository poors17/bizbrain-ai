import React, { useEffect, useState, useCallback, useRef } from "react";

import Layout from "../components/Layout";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { FaUserLock, FaUserCheck, FaCog } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { BarChart, Bar, CartesianGrid } from "recharts";

import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [days, setDays] = useState("7");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [globalRange, setGlobalRange] = useState("7");
const [notificationsOpen, setNotificationsOpen] = useState(false);
const [lastUpdated, setLastUpdated] = useState(new Date());
const [config, setConfig] = useState(null);
const notificationRef = useRef(null);

const [mouse, setMouse] = useState({ x: 0, y: 0 });
const [particles] = useState(
  Array.from({ length: 100 }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 4 + 2
  }))
);
const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();

  setMouse({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  });
};
  const totalMembers =
    (data?.totalUsers ?? 0) + (data?.totalAdmins ?? 0);
  /* ================= NEW PROFESSIONAL METRICS ================= */

// 🔔 Critical Notification Count
const criticalCount =
data?.recentActivity?.filter(log =>
[
 "ACCOUNT_LOCKED",
 "USER_REGISTERED",
 "CONFIG_UPDATED",
 "REPORT_DOWNLOADED",
 "ADMIN_LOGIN",
 "UNBLOCKED_USER"
].includes(log.action)
).length || 0;

// 📊 Retention Rate
const retentionRate =
(data?.totalUsers ?? 0) > 0
  ? ((data?.activeUsers ?? 0) / (data?.totalUsers ?? 1) * 100).toFixed(1)
  : 0;

  /* ================= FETCH ANALYTICS ================= */
  /* ================= FETCH ANALYTICS ================= */
  const fetchAnalytics = useCallback(async (d = days) => {
    try {
      setLoading(true);
  
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
  
      const res = await axios.get(
        `http://localhost:5000/api/admin/analytics?days=${d}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      setData(res.data);
      setLastUpdated(new Date());
  
    } catch (err) {
      console.error("Analytics error", err);
    } finally {
      setLoading(false);
    }
  }, [days]);

/* Initial Fetch */
useEffect(() => {
  fetchAnalytics(days);
}, [fetchAnalytics, days]);

useEffect(() => {
  const fetchConfig = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const res = await axios.get(
        "http://localhost:5000/api/system-config",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setConfig(res.data);

    } catch (err) {
      console.error("Config fetch error", err);
    }
  };

  fetchConfig();
}, []);
/* CLOSE NOTIFICATION WHEN CLICKING OUTSIDE */
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setNotificationsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


const exportToCSV = () => {

  // 🔹 Check config first
  if (!config?.enableReports) {
    alert("Report downloads are disabled by admin");
    return;
  }

  if (!data?.recentActivity?.length) return;

  const headers = ["Admin Name", "Action", "Date"];

  const rows = data.recentActivity.map(log => [
    log.adminId?.name || "Administrator",
    log.action,
    new Date(log.createdAt).toLocaleString()
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows]
      .map(e => e.join(","))
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "admin_activity_log.csv");
  document.body.appendChild(link);
  link.click();
};
  /* ================= NORMALIZE USER GROWTH ================= */
  const normalizeGrowthData = (arr = []) => {
    if (!arr || arr.length === 0) return [];
    if (arr.length === 1) {
      return [{ date: "Start", dailyUsers: 0, totalUsers: 0 }, arr[0]];
    }
    return arr;
  };
// 📊 Average Active Users Calculation
const avgActiveUsers =
  data?.userGrowth?.length
    ? Math.round(
        data.userGrowth.reduce(
          (sum, d) => sum + (d.dailyUsers || 0),
          0
        ) / data.userGrowth.length
      )
    : 0;

    const getNotificationDetails = (action) => {

      switch(action){
    
        case "ACCOUNT_LOCKED":
          return { icon: "🔴", text: "Account locked" };
    
        case "USER_REGISTERED":
          return { icon: "🟢", text: "New user registered" };
    
        case "CONFIG_UPDATED":
          return { icon: "🔵", text: "System configuration updated" };
    
        case "REPORT_DOWNLOADED":
          return { icon: "🟡", text: "Report downloaded" };
    
        case "ADMIN_LOGIN":
          return { icon: "🔐", text: "Admin logged in" };
    
        case "UNBLOCKED_USER":
          return { icon: "📢", text: "User unblocked" };
    
        default:
          return { icon: "📢", text: action };
      }
    
    };
  return (
    <Layout>
      <motion.div
onMouseMove={handleMouseMove}
className="min-h-[200vh] relative overflow-hidden
bg-gradient-to-br from-[#020617] via-[#0b1120] to-[#000814]
flex justify-center"
>
  {/* GRID BACKGROUND */}
<div className="absolute inset-0 opacity-[0.06] 
bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),
linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)]
bg-[size:60px_60px]" />

{/* FLOATING PARTICLES */}
{particles.map((p, i) => (
<motion.div
key={i}
className="absolute w-3 h-3 bg-blue-400 rounded-full opacity-70 shadow-[0_0_10px_#38bdf8]"

style={{
top: `${p.top}%`,
left: `${p.left}%`
}}

initial={{ x: 0, y: 0 }}

animate={{
x: [0, 30 + mouse.x * 0.03, -30 + mouse.x * 0.02, 0],
y: [0, -60 + mouse.y * 0.02, 40 + mouse.y * 0.02, 0],
opacity: [0.3, 0.8, 0.4, 0.7, 0.3]
}}

transition={{
duration: 10,
repeat: Infinity,
ease: "easeInOut",
delay: i * 0.1
}}
/>
))}

{/* MOUSE LIGHT EFFECT */}
<motion.div
className="pointer-events-none absolute w-[500px] h-[500px] rounded-full blur-[150px]"
animate={{
  x: mouse.x - 250,
  y: mouse.y - 250
  }}
transition={{ type: "spring", stiffness: 40 }}
style={{
background: "rgba(59,130,246,0.35)"
}}
/>
      <motion.div
      className="w-full max-w-7xl px-6 py-16 relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
        

{/* ADD HERE 👇 */}

{/* GLOBAL DATE FILTER + BELL */}
<div className="flex justify-between items-center mb-6">
  <div className="flex gap-3">
    {["1", "7", "30"].map(range => (
      <button
        key={range}
        onClick={() => {
          setGlobalRange(range);
          setDays(range);
        }}
        className={`px-4 py-1.5 rounded-full text-sm ${
          globalRange === range
            ? "bg-emerald-500/30 text-emerald-400"
            : "border border-white/20 text-white/60"
        }`}
      >
        Last {range} Days
      </button>
    ))}
  </div>

  {/* 🔔 Notification */}
{/* 🔔 Notification */}
<div className="relative" ref={notificationRef}>

  <FaBell
    className="text-xl text-emerald-400 cursor-pointer hover:scale-110 transition duration-200"
    onClick={() => setNotificationsOpen(!notificationsOpen)}
  />

  {/* 🔴 Critical Badge */}
  {criticalCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
      {criticalCount}
    </span>
  )}

  {/* 🔽 Dropdown */}
  {/* 🔽 Dropdown */}
{notificationsOpen && (
  <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl z-50">

    <p className="text-sm text-emerald-400 mb-3 font-semibold">
      Notifications
    </p>

    <div className="text-xs text-slate-300 space-y-3 max-h-60 overflow-y-auto">

      {data?.recentActivity?.length ? (
        data.recentActivity.slice(0,5).map((log, i) => (

          <div key={i} className="border-b border-slate-700 pb-2">

{(() => {
  const details = getNotificationDetails(log.action);

  return (
    <p className="text-white text-sm">
      {details.icon} {details.text}
    </p>
  );
})()}

            {log.targetUser && (
              <p className="text-emerald-400 text-xs">
                👤 {log.targetUser.username}
              </p>
            )}

{log.adminId && log.action === "UNBLOCKED_USER" && (
  <p className="text-slate-400 text-xs">
    by Admin {log.adminId.name}
  </p>
)}

            <p className="text-slate-400 text-xs">
              {formatDistanceToNow(new Date(log.createdAt))} ago
            </p>

          </div>

        ))
      ) : (
        <p className="text-slate-400 text-center py-4">
          No notifications yet
        </p>
      )}

    </div>

  </div>
)}

</div>
</div>

{/* ================= HEADER ================= */}

        {loading && (
  <div className="flex justify-center mb-6">
    <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
)}

          {/* ================= HEADER ================= */}
          <div className="flex justify-between items-center mb-14">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-slate-400 text-sm">
                Centralized insights into system performance
              </p>
            </div>
            
          </div>

          {/* ================= KPI CARDS ================= */}
          <motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-8"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }}
>
            <Kpi title="Total Members" value={totalMembers} />
            <Kpi title="Registered Users" value={data?.totalUsers ?? 0} />
            <Kpi title="Administrators" value={data?.totalAdmins ?? 0} />
            <Kpi title="Active Users" value={data?.activeUsers ?? 0} />
            <Kpi
  title="Critical Alerts"
  value={
    data?.recentActivity?.filter(log =>
      log.action?.toLowerCase().includes("block")
    ).length ?? 0
  }
/>
<Kpi title="Retention Rate" value={`${retentionRate}%`} />
          
          </motion.div>
          <div className="space-y-2 text-sm text-slate-300">

<p>
  {data?.systemHealth?.apiStatus ? "🟢" : "🔴"} API Status:
  {data?.systemHealth?.apiStatus ? " Online" : " Offline"}
</p>

<p>
  {data?.systemHealth?.dbStatus ? "🟢" : "🔴"} Database:
  {data?.systemHealth?.dbStatus ? " Connected" : " Disconnected"}
</p>

<p>
  {data?.systemHealth?.predictionEngineStatus ? "🟢" : "🟡"} Prediction Engine:
  {data?.systemHealth?.predictionEngineStatus ? " Active" : " No Data"}
</p>

<p>
  🟢 Server Load: {data?.systemHealth?.serverLoad}
</p>

<p className="text-xs text-slate-400">
  Last Updated: {lastUpdated.toLocaleTimeString()}
</p>

</div>
          {/* ================= CHARTS ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12 mb-20">
           
            {/* USER GROWTH */}
            <div className="lg:col-span-2 glass-card p-8">
              <h3 className="text-xl font-semibold text-white mb-5">
                User Growth Trends
              </h3>

              <div className="flex gap-3 mb-6">
                {["7", "30", "all"].map(v => (
                  <button
                    key={v}
                    onClick={() => setDays(v)}
                    className={`px-4 py-1.5 rounded-full text-sm transition ${
                      days === v
                        ? "bg-emerald-500/30 text-emerald-400"
                        : "border border-white/20 text-white/60 hover:text-white"
                    }`}
                  >
                    {v === "all" ? "All Time" : `Last ${v} Days`}
                  </button>
                ))}
              </div>

              {data?.userGrowth?.length === 0 ? (
  <div className="flex flex-col items-center justify-center h-[320px] text-slate-400">
    <span className="text-4xl mb-2">📉</span>
    No users registered in the last {days} days
  </div>
) : (
  <div style={{ width: "100%", height: 320 }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={normalizeGrowthData(data?.userGrowth)}>
        <XAxis dataKey="date" stroke="#94a3b8" />
        <YAxis allowDecimals={false} stroke="#94a3b8" />
        <Tooltip />
        <Line type="monotone" dataKey="dailyUsers" stroke="#22c55e" strokeWidth={3} />
        <Line type="monotone" dataKey="totalUsers" stroke="#60a5fa" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}

              {data?.peakDay && (
                <div className="mt-5 text-sm text-emerald-300">
                  🔥 Peak Registration Day:{" "}
                  <span className="font-semibold">
                    {data.peakDay._id} ({data.peakDay.count} new users)
                  </span>
                </div>
              )}
            </div>

            {/* ================= ROLE DISTRIBUTION ================= */}
<div className="glass-card p-8 flex flex-col items-center shadow-lg shadow-emerald-500/5">

<h3 className="text-xl font-semibold text-white mb-6 tracking-wide">
  Role Distribution
</h3>

<ResponsiveContainer width="100%" height={280}>
  <PieChart>
    <Pie
      data={[
        { label: "Users", value: data?.totalUsers ?? 0 },
        { label: "Admins", value: data?.totalAdmins ?? 0 }
      ]}
      dataKey="value"
      nameKey="label"
      cx="50%"
      cy="50%"
      innerRadius={70}
      outerRadius={100}
      paddingAngle={5}
    >
      <Cell fill="#22c55e" />
      <Cell fill="#60a5fa" />
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>

<div className="flex gap-8 mt-6 text-sm text-slate-300">
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-emerald-500" />
    Users ({data?.totalUsers ?? 0})
  </div>
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-blue-400" />
    Admins ({data?.totalAdmins ?? 0})
  </div>
</div>

</div>
</div>
{/* ================= ACTIVE USERS TREND ================= */}
<div className="glass-card p-8 mb-20">
  <h3 className="text-xl font-semibold text-white mb-5">
    Daily Active Users Trend
  </h3>

  <p className="text-sm text-slate-400 mb-3">
    Tracks the number of users actively engaging with the platform each day.
  </p>

  <p className="text-sm mb-6">
  <span className="text-slate-400">
    Average daily active users:
  </span>
  <span className="text-emerald-400 font-semibold ml-2">
    {avgActiveUsers}
  </span>
</p>

  {data?.userGrowth?.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-[280px] text-slate-400">
      <span className="text-4xl mb-2">📉</span>
      No active users recorded in the last {days} days
    </div>
  ) : (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={normalizeGrowthData(data?.userGrowth)}>
        <XAxis dataKey="date" stroke="#94a3b8" />
        <YAxis allowDecimals={false} stroke="#94a3b8" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="dailyUsers"
          stroke="#f59e0b"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  )}

  {/* ✅ Engagement Status Message (Option 3) */}
  {avgActiveUsers === 0 ? (
    <p className="text-center text-red-400 mt-4">
      🚫 No engagement detected during this period.
    </p>
  ) : avgActiveUsers < 3 ? (
    <p className="text-center text-yellow-400 mt-4">
      ⚠️ Low engagement detected. Consider improving user interaction.
    </p>
  ) : (
    <p className="text-center text-emerald-400 mt-4">
      ✅ Healthy daily user engagement observed.
    </p>
  )}
</div>
          {/* ================= HEATMAP ================= */}
          <div className="glass-card p-8 mb-20">
            <h3 className="text-xl font-semibold text-white mb-1">
              User Registration Activity
            </h3>
            <p className="text-sm text-slate-400 mb-5">
              Visual representation of daily user sign-up intensity
            </p>

            <div className="flex flex-wrap gap-3">
              {(data?.heatmapData || []).map((d, i) => (
                <div
                  key={i}
                  title={`${d.date} : ${d.count} registrations`}
                  className={`w-7 h-7 rounded transition hover:scale-110 ${
                    d.level === "high"
                      ? "bg-green-500"
                      : d.level === "medium"
                      ? "bg-yellow-400"
                      : "bg-red-500"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-6 mt-6 text-sm text-slate-300">
              <Legend color="bg-red-500" label="Low Activity (1–2)" />
              <Legend color="bg-yellow-400" label="Moderate Activity (3–4)" />
              <Legend color="bg-green-500" label="High Activity (5+)" />
            </div>
          </div>

          {/* ================= RECENT ACTIVITY ================= */}
          {/* ================= PROFESSIONAL ADMIN ACTIVITY LOG ================= */}
<div className="glass-card p-10 relative overflow-hidden">

{/* Header */}
<div className="flex justify-between items-center mb-8">
  <div>
    <h3 className="text-2xl font-bold text-white tracking-wide">
      Administrative Activity Log
    </h3>
    <p className="text-slate-400 text-sm mt-1">
      Real-time tracking of administrative system actions
    </p>
  </div>

  <div className="text-sm text-slate-400 space-x-6">
  <span>
    Total Actions:{" "}
    <span className="text-white font-semibold">
      {data?.recentActivity?.length || 0}
    </span>
  </span>

  <span>
    Critical:{" "}
    <span className="text-red-400 font-semibold">
      {data?.recentActivity?.filter(log =>
        log.action?.toLowerCase().includes("block")
      ).length || 0}
    </span>
  </span>

  {/* ADD THIS BUTTON HERE */}
  <button
    onClick={exportToCSV}
    className="ml-4 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm hover:bg-emerald-500/30 transition"
  >
    Export CSV
  </button>
</div>

</div>

{/* Search */}
<div className="relative mb-10">
  <input
    type="text"
    placeholder="Search by admin name or action type..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-emerald-500 transition"
  />
</div>

{/* Activity List */}
<div className="space-y-6">
  {data?.recentActivity?.length ? (
    data.recentActivity
      .filter(log =>
        log.adminId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        log.action?.toLowerCase().includes(search.toLowerCase())
      )
      .map((log, i) => {

        const action = log.action?.toLowerCase() || "";
        const isUnblocked = action.includes("unblock");
        const isBlocked = action.includes("block") && !isUnblocked;

        return (
          <div
            key={i}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-6 transition hover:scale-[1.01] hover:border-emerald-500/40"
          >

            {/* Left Status Bar */}
            <div
              className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl
                ${
                  isBlocked
                    ? "bg-red-500"
                    : isUnblocked
                    ? "bg-green-500"
                    : "bg-blue-500"
                }`}
            />

            <div className="flex justify-between items-center mb-4">

              {/* Admin Info */}
              <div>
                <p className="text-lg font-semibold text-emerald-400">
                  {log.adminId?.name || "Administrator"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {formatDistanceToNow(new Date(log.createdAt))} ago
                </p>
              </div>

              {/* Badge */}
              <span
                className={`px-4 py-1.5 text-xs rounded-full font-semibold tracking-wide
                  ${
                    isBlocked
                      ? "bg-red-500/20 text-red-400"
                      : isUnblocked
                      ? "bg-green-500/20 text-green-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
              >
                {isBlocked
                  ? "Critical Action"
                  : isUnblocked
                  ? "Access Restored"
                  : "System Update"}
              </span>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-4 text-slate-300 text-sm">

              {isBlocked && (
                <FaUserLock className="text-red-400 text-lg" />
              )}

              {isUnblocked && (
                <FaUserCheck className="text-green-400 text-lg" />
              )}

              {!isBlocked && !isUnblocked && (
                <FaCog className="text-blue-400 text-lg" />
              )}

<div className="tracking-wide">
  <span>{log.action}</span>

  {log.targetUser && (
    <div className="text-xs text-emerald-400 mt-1">
      👤 {log.targetUser.username}
      <span className="text-slate-400"> • {log.targetUser.email}</span>
    </div>
  )}
</div>
            </div>
          </div>
        );
      })
  ) : (
    <div className="text-center py-14 text-slate-500">
      <FaCog className="mx-auto text-4xl mb-4 opacity-40" />
      No administrative actions recorded yet
    </div>
  )}
</div>
</div>
{/* ================= MOST USED ALGORITHM ================= */}
{data?.mostUsedAlgorithm && (
  <div className="glass-card p-8 mt-16">
    <h3 className="text-xl font-semibold text-white mb-4">
      🏆 Most Used Algorithm (Platform Wide)
    </h3>

    <div className="text-emerald-400 text-lg font-semibold">
      {data.mostUsedAlgorithm[0]?.toUpperCase()}
    </div>

    <p className="text-slate-400 text-sm mt-1">
      Used {data.mostUsedAlgorithm[1]} times out of {data.totalAlgoPredictions} predictions
    </p>
  </div>
)}
{/* ================= ALGORITHM USAGE ANALYTICS ================= */}
<div className="glass-card p-8 mt-16">
  <h3 className="text-xl font-semibold text-white mb-6">
    Algorithm Usage Analytics
  </h3>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={Object.entries(data?.algorithmStats || {}).map(
        ([key, value]) => ({
          name: key.toUpperCase(),
          value
        })
      )}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
      <XAxis dataKey="name" stroke="#94a3b8" />
      <YAxis stroke="#94a3b8" />
      <Tooltip />
      <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

        </motion.div>
        </motion.div>
      
    </Layout>
  );
};

const Kpi = ({ title, value }) => (
  <motion.div
    className="glass-card p-6 hover:scale-[1.02] transition"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.4 }}
  >
    <span className="text-slate-400 text-sm">{title}</span>
    <h2 className="text-3xl font-bold text-white mt-3">{value}</h2>
  </motion.div>
);

const Legend = ({ color, label }) => (
  <span className="flex items-center gap-2">
    <span className={`w-3 h-3 rounded-full ${color}`} />
    {label}
  </span>
);

export default AdminAnalytics;
