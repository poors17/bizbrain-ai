import React, { useState } from "react";
import { uploadBusinessData } from "../services/dataService";
import { useNavigate } from "react-router-dom";

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a CSV or Excel file");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await uploadBusinessData(file);

      setMessage("✅ Upload & prediction completed");

      setTimeout(() => {
        navigate("/prediction", {
          state: {
            prediction: res.data.prediction,
            fileName: file.name
          }
        });
      }, 1200);

    } catch (err) {
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">

      <h3 className="text-lg font-semibold text-white mb-1">
        Upload Dataset
      </h3>

      <p className="text-slate-400 text-sm mb-6">
        Supported formats: <b>.csv</b>, <b>.xlsx</b>
      </p>

      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full mb-6 text-sm text-slate-300
                   file:mr-4 file:py-2 file:px-5
                   file:rounded-full file:border-0
                   file:bg-white/10 file:text-white
                   hover:file:bg-white/20 transition"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full h-11 rounded-full
                   bg-gradient-to-r from-blue-500 to-cyan-400
                   text-slate-900 font-semibold
                   hover:opacity-90 transition"
      >
        {loading ? "Uploading..." : "Upload & Predict"}
      </button>

      {message && (
        <p className={`mt-4 text-sm ${
          message.includes("❌") ? "text-red-400" : "text-emerald-400"
        }`}>
          {message}
        </p>
      )}

    </div>
  );
};

export default UploadData;
