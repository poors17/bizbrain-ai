import React from "react";
const formatNumber = (value) =>
  value?.toLocaleString("en-IN");

const AlgorithmComparison = ({ result }) => {
  const algorithms = ["r2sp", "iwpa", "tmsa", "rapa"];

  const bestKey = result?.bestAlgorithm
    ? result.bestAlgorithm.toLowerCase()
    : null;

  return (
    <div className="glass-card mb-10">
      <h3 className="text-lg font-semibold text-white mb-4">
        Algorithm Comparison
      </h3>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="text-slate-400 border-b border-white/10">
            <th className="py-2 text-left">Algorithm</th>
            <th className="py-2 text-left">Sales</th>
            <th className="py-2 text-left">Expense</th>
            <th className="py-2 text-left">Profit</th>
          </tr>
        </thead>
        <tbody>
          {algorithms.map((algo) => (
            <tr
              key={algo}
              className={`border-b border-white/5 ${
                bestKey === algo ? "bg-green-500/10" : ""
              }`}
            >
              <td className="py-2 font-semibold uppercase">{algo}</td>
              <td>₹ {result[algo]?.sales ? formatNumber(result[algo]?.sales) : "-"}</td>
<td>₹ {result[algo]?.expense ? formatNumber(result[algo]?.expense) : "-"}</td>
<td>₹ {result[algo]?.profit ? formatNumber(result[algo]?.profit) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-emerald-400 font-semibold">
        ✅ Best Algorithm: {result.bestAlgorithm || "N/A"}
      </div>
    </div>
  );
};

export default AlgorithmComparison;
