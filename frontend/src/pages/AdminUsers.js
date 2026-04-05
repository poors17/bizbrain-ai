import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedUser, setSelectedUser] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [selectedUsers, setSelectedUsers] = useState([]);

const handleMouseMove = (e) => {
  setMouse({
    x: e.clientX,
    y: e.clientY
  });
};

const toggleUserSelection = (id) => {
  setSelectedUsers((prev) =>
    prev.includes(id)
      ? prev.filter((uid) => uid !== id)
      : [...prev, id]
  );
};
const handleBulkDelete = async () => {

  if (!window.confirm("Delete selected users?")) return;

  await Promise.all(
    selectedUsers.map(id =>
      axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    )
  );

  setUsers(users.filter(u => !selectedUsers.includes(u._id)));
  setSelectedUsers([]);
};

const handleBulkBlock = async () => {

  await Promise.all(
    selectedUsers.map(id =>
      axios.put(
        `http://localhost:5000/api/admin/users/${id}/status`,
        { status: "BLOCKED" },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    )
  );

  fetchUsers();
  setSelectedUsers([]);
};
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const getOnlineStatus = (lastLogin) => {
    if (!lastLogin) return "Never";

    const diffMs = Date.now() - new Date(lastLogin).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins <= 5) return "Online";

    if (diffMins < 60)
      return `Last seen ${diffMins} min${diffMins > 1 ? "s" : ""} ago`;

    if (diffHours < 72)
      return `Last seen ${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;

    return `Last seen ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  const fetchUsers = useCallback(async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/users",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUsers(res.data);
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await axios.delete(
      `http://localhost:5000/api/admin/users/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setUsers(users.filter((u) => u._id !== id));
  };

  const handleBlock = async (id, status) => {
    const newStatus = status === "BLOCKED" ? "ACTIVE" : "BLOCKED";

    const res = await axios.put(
      `http://localhost:5000/api/admin/users/${id}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setUsers(users.map((u) => (u._id === id ? res.data : u)));

    if (selectedUser?._id === id) {
      setSelectedUser(res.data);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/users/${id}/status`,
        { status: "ACTIVE" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(users.map((u) => (u._id === id ? res.data : u)));

      if (selectedUser?._id === id) {
        setSelectedUser(res.data);
      }
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const filteredUsers = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "name"
        ? a.name.localeCompare(b.name)
        : a.email.localeCompare(b.email)
    );

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

        <div className="w-full max-w-7xl px-6 py-16 animate-fadeIn">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">

            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide">
                User Management
              </h1>

              <p className="text-slate-400 text-sm">
                Manage registered users and access permissions
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center">

              <span className="px-4 py-2 rounded-full bg-emerald-400/15 text-emerald-400 text-sm font-semibold shadow-lg">
                Total Count: {users.length}
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/5 borderborder border-slate-700/40 text-white text-sm outline-none backdrop-blur-lg hover:border-blue-400 transition"
              >
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
              </select>

              <input
                type="text"
                placeholder="Search name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/5 border  border-slate-700/40 text-white text-sm outline-none backdrop-blur-lg focus:border-blue-400 transition"
              />

            </div>
          </div>
{/* USER STATS */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-lg shadow-lg">
<p className="text-slate-400 text-sm">Total Members</p>
<p className="text-2xl font-bold text-white">{users.length}</p>
</div>

<div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-lg shadow-lg">
<p className="text-slate-400 text-sm">Active Members</p>
<p className="text-2xl font-bold text-green-400">
{users.filter(u => u.status === "ACTIVE").length}
</p>
</div>

<div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-lg">
<p className="text-slate-400 text-sm">Blocked Members</p>
<p className="text-2xl font-bold text-red-400">
{users.filter(u => u.status === "BLOCKED").length}
</p>
</div>

</div>
{selectedUsers.length > 0 && (

<div className="flex gap-3 mb-4">

<button
onClick={handleBulkBlock}
className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
>
Block Selected
</button>

<button
onClick={handleBulkDelete}
className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
>
Delete Selected
</button>

</div>

)}

          {/* TABLE */}
          <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">

            <table className="w-full text-left text-sm text-slate-300">

            <thead className="bg-slate-800/60 text-slate-200">
<tr className="border-b border-white/10">

<th className="px-6 py-4 text-center w-12">
<input
type="checkbox"
onChange={(e) =>
setSelectedUsers(
e.target.checked ? users.map(u => u._id) : []
)
}
/>
</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Last Login</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
<AnimatePresence>

                {filteredUsers.map((u, index) => {

                  const isSelf = loggedInUser?.id === u._id;

                  return (

                    <motion.tr
                    key={u._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -120 }}
                    transition={{ duration: 0.3 }}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      className={`border-t border-white/10 transition-all duration-300
                        hover:bg-blue-500/5 hover:scale-[1.01]
                        hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]
                        animate-slideUp
                      ${u.status === "PENDING" ? "bg-yellow-500/5" : ""}`}
                    >
<td className="px-6 py-4 text-center w-12">

<input
type="checkbox"
className="cursor-pointer accent-blue-500"
checked={selectedUsers.includes(u._id)}
onChange={() => toggleUserSelection(u._id)}
/>

</td>
<td className="px-6 py-4">

<div className="flex items-center gap-3">

<div className="relative">

<div className="w-9 h-9 rounded-full 
bg-gradient-to-br from-blue-500 to-cyan-400
flex items-center justify-center text-white text-sm font-semibold">

{u.name.charAt(0)}

</div>

{getOnlineStatus(u.lastLogin) === "Online" && (
<div className="absolute bottom-0 right-0 w-2.5 h-2.5 
bg-green-400 rounded-full border border-slate-900"></div>
)}

</div>

<span className="text-white font-medium">{u.name}</span>

</div>

</td>

                      <td className="px-6 py-4">
                        {u.email}
                      </td>

                      <td className="px-6 py-4">

<span className={`px-3 py-1 text-xs rounded-full font-semibold
${u.role === "ADMIN"
? "bg-purple-500/20 text-purple-400"
: "bg-blue-500/20 text-blue-400"}`}>

{u.role}

</span>

</td>

                      <td className="px-6 py-4 text-center">

                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold animate-pulse
                          ${
                            u.status === "ACTIVE"
                              ? "bg-green-500/20 text-green-400"
                              : u.status === "PENDING"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {u.status}
                        </span>

                      </td>

                      <td className="px-6 py-4 text-center text-slate-300 text-sm">
                        {getOnlineStatus(u.lastLogin)}
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-center gap-3">

                          {u.status === "PENDING" && (
                            <button
                              onClick={() => handleApprove(u._id)}
                              disabled={isSelf}
                              className="w-24 px-4 py-1.5 rounded-full
                              bg-gradient-to-r from-emerald-500 to-green-400
                              text-white text-xs font-semibold
                              transition-all duration-300 hover:scale-110 hover:shadow-xl"
                            >
                              Approve
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedUser(u)}
                            className="w-20 px-4 py-1.5 rounded-full
                            bg-blue-500/15 text-blue-400
                            hover:bg-blue-500/30 hover:scale-110 transition"
                          >
                            View
                          </button>

                          <button
                            onClick={() => handleBlock(u._id, u.status)}
                            disabled={isSelf}
                            className={`w-20 px-4 py-1.5 rounded-full transition-all duration-300
                            ${
                              isSelf
                                ? "bg-gray-500/20 text-gray-400 cursor-not-allowed"
                                : "bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 hover:scale-110"
                            }`}
                          >
                            {isSelf
                              ? "You"
                              : u.status === "BLOCKED"
                              ? "Unblock"
                              : "Block"}
                          </button>

                          <button
                            onClick={() => handleDelete(u._id)}
                            disabled={isSelf}
                            className={`w-20 px-4 py-1.5 rounded-full transition-all duration-300
                            ${
                              isSelf
                                ? "bg-gray-500/20 text-gray-400 cursor-not-allowed"
                                : "bg-red-500/15 text-red-400 hover:bg-red-500/25 hover:scale-110"
                            }`}
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </motion.tr>

                  );

                })}
</AnimatePresence>
              </tbody>

            </table>

          </div>

          {/* VIEW MODAL */}

          {selectedUser && (

            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">

              <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-md animate-scaleUp shadow-2xl">

                <h2 className="text-xl font-bold text-white mb-4">
                  User Details
                </h2>

                <div className="space-y-2 text-slate-300">

                  <p><b>Name:</b> {selectedUser.name}</p>
                  <p><b>Email:</b> {selectedUser.email}</p>
                  <p><b>Role:</b> {selectedUser.role}</p>
                  <p><b>Status:</b> {selectedUser.status}</p>

                  <p>
                    <b>Registered:</b>{" "}
                    {new Date(selectedUser.createdAt).toLocaleString()}
                  </p>

                  <p>
                    <b>Last Login:</b>{" "}
                    {selectedUser.lastLogin
                      ? new Date(selectedUser.lastLogin).toLocaleString()
                      : "Never"}
                  </p>

                </div>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="mt-6 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                >
                  Close
                </button>

              </div>

            </div>

          )}

        </div>

      </motion.div>
    </Layout>
  );
};

export default AdminUsers;