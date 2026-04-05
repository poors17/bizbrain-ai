import React, { useState, useEffect } from "react";


const InsightsPanel = ({ result }) => {
  const [alerts, setAlerts] = useState([]);
  const bestKey = result?.bestAlgorithm
    ? result.bestAlgorithm.toLowerCase()
    : null;

  const bestData = bestKey ? result?.[bestKey] : null;

  useEffect(() => {

    if (result?.securityAlerts) {
      setAlerts(result.securityAlerts);
    }
  
  }, [result]);

  return (
    <div className="glass-card mb-12">
      {/* SECURITY ALERTS */}

{alerts.length > 0 && (
  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">

    <h4 className="text-red-400 font-semibold mb-2">
      ⚠ Security Alerts
    </h4>

    {alerts.map((a, i) => (
      <p key={i} className="text-sm text-slate-300">
        User {a.targetUser.username} account locked due to multiple failed login attempts
      </p>
    ))}

  </div>
)}

<h3 className="text-lg font-semibold text-white mb-4">
  AI Insights
</h3>

      {bestData ? (
        <div className="text-slate-300 text-sm space-y-3">
          <p>
            📊 <strong>{result.bestAlgorithm}</strong> performed best
            based on prediction comparison.
          </p>

          <p>💰 Expected Profit: ₹ {bestData.profit}</p>
          <p>🎯 Confidence Score: {result.confidence ?? 0}%</p>

          <p>
            📈 The model suggests stable growth and optimized expense
            control.
          </p>
        </div>
      ) : (
        <p className="text-slate-400 text-sm">
          No insights available.
        </p>
      )}
    </div>
  );
};

export default InsightsPanel;
