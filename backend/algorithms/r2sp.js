exports.r2spPredict = (rows) => {
  const sales = rows.map(r => Number(r.sales));
  const expense = rows.map(r => Number(r.expense));

  const n = sales.length;
  if (n < 4) throw new Error("Need at least 4 rows");

  // Train data (exclude last row)
  const trainSales = sales.slice(0, n - 1);
  const trainExpense = expense.slice(0, n - 1);

  const m = trainSales.length;

  // Weighted toward recent 3 values
  const predictedSales =
    trainSales[m - 1] * 0.6 +
    trainSales[m - 2] * 0.3 +
    trainSales[m - 3] * 0.1;

  const predictedExpense =
    trainExpense[m - 1] * 0.6 +
    trainExpense[m - 2] * 0.3 +
    trainExpense[m - 3] * 0.1;

  const actualSales = sales[n - 1];

  const accuracy =
    actualSales === 0
      ? 0
      : 100 - (Math.abs(actualSales - predictedSales) / actualSales) * 100;

  return {
    sales: Math.round(predictedSales),
    expense: Math.round(predictedExpense),
    profit: Math.round(predictedSales - predictedExpense),
    accuracy: Math.max(0, Math.round(accuracy)),
    confidence: Math.max(0, Math.round(accuracy))
  };
};
