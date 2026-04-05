import React from "react";
import Layout from "../components/Layout";

const Features = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black
                      flex justify-center">

        <div className="w-full max-w-7xl px-6 py-20 animate-fadeIn">

          {/* ================= HEADER ================= */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Platform Features
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-sm">
              BizBrain AI delivers enterprise-grade analytics and AI-powered
              insights to help businesses make smarter, faster decisions.
            </p>
          </div>

          {/* ================= FEATURES GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            <FeatureCard
              icon="📊"
              title="Advanced Data Analytics"
              desc="Analyze revenue, expenses, growth trends, and KPIs using structured dashboards and intelligent data processing."
            />

            <FeatureCard
              icon="🤖"
              title="Predictive Intelligence"
              desc="AI-driven forecasting models help anticipate future trends and support proactive business planning."
            />

            <FeatureCard
              icon="🔍"
              title="Explainable Insights"
              desc="Transparent AI predictions with logical explanations build trust and confidence in analytics."
            />

            <FeatureCard
              icon="📈"
              title="Performance Monitoring"
              desc="Track real-time performance metrics and visualize opportunities for optimization and growth."
            />

          </div>

        </div>
      </div>
    </Layout>
  );
};

/* ================= FEATURE CARD ================= */

const FeatureCard = ({ icon, title, desc }) => (
  <div
    className="glass-card p-8 text-center hover:scale-[1.03]
               transition-transform duration-300 animate-slideUp"
  >
    <div className="w-14 h-14 mx-auto mb-6 rounded-full
                    bg-emerald-500/20 flex items-center justify-center
                    text-2xl">
      {icon}
    </div>

    <h3 className="text-lg font-semibold text-white mb-3">
      {title}
    </h3>

    <p className="text-slate-400 text-sm leading-relaxed">
      {desc}
    </p>
  </div>
);

export default Features;
