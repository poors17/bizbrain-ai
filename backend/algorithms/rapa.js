exports.rapaPredict = (rows) => {
    const sales = rows.map(r => Number(r.sales));
    const expense = rows.map(r => Number(r.expense));
  
    const n = sales.length;
    if (n < 4) throw new Error("Need at least 4 rows");
  
    const trainSales = sales.slice(0, n - 1);
    const trainExpense = expense.slice(0, n - 1);
  
    const avgSales =
      trainSales.reduce((a, b) => a + b, 0) / trainSales.length;
  
    const variance =
      trainSales.reduce(
        (sum, val) => sum + Math.pow(val - avgSales, 2),
        0
      ) / trainSales.length;
  
    const riskFactor = Math.sqrt(variance);
  
    const predictedSales =
      avgSales - riskFactor * 0.2;
  
    const avgExpense =
      trainExpense.reduce((a, b) => a + b, 0) / trainExpense.length;
  
    const actualSales = sales[n - 1];
  
    const accuracy =
      actualSales === 0
        ? 0
        : 100 - (Math.abs(actualSales - predictedSales) / actualSales) * 100;
  
    return {
      sales: Math.round(predictedSales),
      expense: Math.round(avgExpense),
      profit: Math.round(predictedSales - avgExpense),
      accuracy: Math.max(0, Math.round(accuracy)),
      confidence: Math.max(0, Math.round(accuracy))
    };
  };
  