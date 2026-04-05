import React from "react";
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black
                      flex justify-center">

        <div className="w-full max-w-7xl px-6 py-20 animate-fadeIn">

          {/* ================= HEADER ================= */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              About BizBrain AI
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-sm">
              BizBrain AI is a next-generation business analytics platform
              designed to transform raw data into intelligent, actionable
              insights using AI-driven predictions.
            </p>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

            {/* TEXT SECTION */}
            <div className="space-y-10 animate-slideUp">

              <div className="glass-card p-8">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Our Vision
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  To empower businesses with intelligent analytics and predictive
                  insights that improve decision accuracy, operational efficiency,
                  and long-term growth.
                </p>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-xl font-semibold text-white mb-3">
                  What We Do
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  BizBrain AI processes structured business data, applies advanced
                  AI and predictive models, and presents results through
                  interactive dashboards with explainable insights for confident
                  decision-making.
                </p>
              </div>

            </div>

            {/* IMAGE SECTION */}
            <div className="animate-slideUp">
              <div className="glass-card p-3">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1100&q=80"
                  alt="AI Data Analysis and Insights"
                  className="rounded-xl"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
};

export default About;
