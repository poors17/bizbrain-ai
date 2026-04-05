import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Home = () => {
  const navigate = useNavigate();

  // ✅ FIX: clean public render (ESLint safe)
  useEffect(() => {
    // scroll reset
    window.scrollTo(0, 0);

    // force repaint (prevents admin layout flash)
    document.body.style.display = "none";
    void document.body.offsetHeight; // ✅ ESLint-safe reflow trigger
    document.body.style.display = "";
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-data-center-analytics-6992/1080p.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950/90 to-cyan-950/60"></div>

       {/* AI Glow Background */}
<div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-cyan-500/20 blur-[220px] rounded-full animate-pulse"></div>

<div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-500/20 blur-[220px] rounded-full animate-pulse"></div>

<div className="absolute top-[40%] left-[35%] w-[400px] h-[400px] bg-indigo-500/10 blur-[200px] rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-10 pt-36 pb-28 grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="animate-fadeInUp">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Business Analytics <br />
              for <span className="text-cyan-400">Smarter Decisions</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              BizBrain AI transforms complex business data into actionable
              insights, predictive intelligence, and interactive dashboards
              that empower confident decision-making.
            </p>

            <div className="mt-10 flex gap-6">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
              >
                Login
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="animate-fadeInRight">
          <div className="rounded-3xl p-4 bg-white/10 backdrop-blur-xl border border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.25)] transform transition duration-500 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                alt="Analytics Dashboard"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
       
      </section>
{/* STATS */}
<section className="relative py-24 bg-gradient-to-b from-[#020617] via-[#020617] to-[#030b1a] overflow-hidden">
  {/* Background Glow */}
<div className="absolute top-[-150px] left-[20%] w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full"></div>

<div className="absolute bottom-[-150px] right-[20%] w-[500px] h-[500px] bg-blue-500/10 blur-[180px] rounded-full"></div>

  <div className="relative max-w-7xl mx-auto px-10 grid md:grid-cols-3 gap-10 text-center">
  
  <div>
  <h3 className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
    120+
  </h3>

  <p className="text-slate-400 mt-2">Businesses Using BizBrain</p>

  <p className="text-xs text-slate-500 mt-1">
    Trusted by startups and enterprises worldwide
  </p>
</div>

<div>
  <h3 className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
    98%
  </h3>

  <p className="text-slate-400 mt-2">Prediction Accuracy</p>

  <p className="text-xs text-slate-500 mt-1">
    AI-driven forecasting benchmark accuracy
  </p>
</div>

<div>
  <h3 className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
    1M+
  </h3>

  <p className="text-slate-400 mt-2">Data Points Processed</p>

  <p className="text-xs text-slate-500 mt-1">
    Large-scale datasets analysed by BizBrain AI
  </p>
</div>
  </div>
</section>
<section className="relative py-24 bg-gradient-to-b from-[#020617] via-[#020617] to-[#030b1a] overflow-hidden">

  {/* Background Glow */}
  <div className="absolute top-[-150px] left-[20%] w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full"></div>

<div className="absolute bottom-[-150px] right-[20%] w-[500px] h-[500px] bg-blue-500/10 blur-[180px] rounded-full"></div>
<div className="max-w-7xl mx-auto px-10">

<h2 className="text-4xl font-bold text-center text-white mb-20">
How BizBrain AI Works
</h2>

<div className="grid md:grid-cols-3 gap-12 text-center">

<div>
<div className="text-5xl mb-6">📂</div>
<h3 className="text-xl font-semibold text-cyan-400 mb-3">
Upload Data
</h3>
<p className="text-slate-400 text-sm">
Upload business datasets including revenue,
expenses and operational metrics.
</p>
</div>

<div>
<div className="text-5xl mb-6">⚙️</div>
<h3 className="text-xl font-semibold text-cyan-400 mb-3">
AI Prediction
</h3>
<p className="text-slate-400 text-sm">
Advanced algorithms analyse patterns and
generate predictive insights instantly.
</p>
</div>

<div>
<div className="text-5xl mb-6">📈</div>
<h3 className="text-xl font-semibold text-cyan-400 mb-3">
Actionable Insights
</h3>
<p className="text-slate-400 text-sm">
Interactive dashboards help businesses
make confident strategic decisions.
</p>
</div>

</div>

</div>
</section>
     {/* CAPABILITIES */}
<section className="relative bg-gradient-to-b from-[#020617] via-black to-[#020617] py-28 overflow-hidden">

{/* Floating AI Glow */}
<div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] bg-cyan-500/10 blur-[160px] rounded-full"></div>

<div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-blue-500/10 blur-[160px] rounded-full"></div>

<div className="relative max-w-7xl mx-auto px-10">
        
       
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Core Capabilities
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-10 rounded-2xl bg-[#0b1120]/70 backdrop-blur-lg border border-cyan-400/10 hover:border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.08)] transition transform hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                Advanced Analytics
              </h3>
              <p className="text-slate-300 text-sm">
                Revenue, expenses, KPIs with structured pipelines and dashboards.
              </p>
            </div>

            <div className="p-10 rounded-2xl bg-[#0b1120]/70 backdrop-blur-lg border border-cyan-400/10 hover:border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.08)] transition transform hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                Predictive Intelligence
              </h3>
              <p className="text-slate-300 text-sm">
                AI-powered forecasting for proactive planning and growth.
              </p>
            </div>

            <div className="p-10 rounded-2xl bg-[#0b1120]/70 backdrop-blur-lg border border-cyan-400/10 hover:border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.08)] transition transform hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                Explainable Insights
              </h3>
              <p className="text-slate-300 text-sm">
                Transparent logic and confidence-based decision support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#020617] py-10 text-center text-slate-400 text-sm border-t border-cyan-400/10">

<p>© 2026 BizBrain AI. All rights reserved.</p>

<p className="text-xs text-slate-500 mt-2">
Business Intelligence & Predictive Analytics Platform
</p>

</footer>

      {/* Animations */}
      <style>
        {`
          .animate-fadeInUp {
            animation: fadeInUp 1s ease forwards;
          }
          .animate-fadeInRight {
            animation: fadeInRight 1.2s ease forwards;
          }
          @keyframes fadeInUp {
            from { opacity:0; transform:translateY(40px); }
            to { opacity:1; transform:translateY(0); }
          }
          @keyframes fadeInRight {
            from { opacity:0; transform:translateX(40px); }
            to { opacity:1; transform:translateX(0); }
          }
        `}
      </style>
    </Layout>
  );
};

export default Home;
