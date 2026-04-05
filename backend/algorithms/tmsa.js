exports.tmsaPredict = (rows) => {
    const sales = rows.map(r => Number(r.sales));
    const expense = rows.map(r => Number(r.expense));
  
    const n = sales.length;
    if (n < 4) throw new Error("Need at least 4 rows");
  
    const trainSales = sales.slice(0, n - 1);
    const trainExpense = expense.slice(0, n - 1);
  
    const m = trainSales.length;
  
    const trendSales =
      trainSales[m - 1] - trainSales[m - 2];
  
    const trendExpense =
      trainExpense[m - 1] - trainExpense[m - 2];
  
    const predictedSales =
      trainSales[m - 1] + trendSales;
  
    const predictedExpense =
      trainExpense[m - 1] + trendExpense;
  
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
  