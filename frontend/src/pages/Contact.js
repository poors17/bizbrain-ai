import React from "react";
import Layout from "../components/Layout";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black
                      flex justify-center">

        <div className="w-full max-w-7xl px-6 py-20 animate-fadeIn">

          {/* HEADER */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Contact BizBrain AI
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-sm">
              Reach out to us for support, product information, or collaboration
              opportunities.
            </p>
          </div>

          {/* CONTACT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-slideUp">

            {/* EMAIL */}
            <div className="glass-card p-10 text-center hover:scale-[1.03] transition">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full
                              bg-emerald-500/20 flex items-center justify-center">
                <FaEnvelope className="text-emerald-400 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Email Support
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                For platform questions and general inquiries.
              </p>
              <span className="text-emerald-400 font-medium">
                support@bizbrain.ai
              </span>
            </div>

            {/* PHONE */}
            <div className="glass-card p-10 text-center hover:scale-[1.03] transition">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full
                              bg-blue-500/20 flex items-center justify-center">
                <FaPhoneAlt className="text-blue-400 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Phone Support
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Speak with our support team during business hours.
              </p>
              <span className="text-blue-400 font-medium">
                +91 98765 43210
              </span>
            </div>

            {/* LOCATION */}
            <div className="glass-card p-10 text-center hover:scale-[1.03] transition">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full
                              bg-purple-500/20 flex items-center justify-center">
                <FaMapMarkerAlt className="text-purple-400 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Business Location
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Our operations are based in India.
              </p>
              <span className="text-purple-400 font-medium">
                India
              </span>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Contact;
