exports.iwpaPredict = (rows) => {
  const sales = rows.map(r => Number(r.sales));
  const expense = rows.map(r => Number(r.expense));

  const n = sales.length;
  if (n < 4) throw new Error("Need at least 4 rows");

  const trainSales = sales.slice(0, n - 1);
  const trainExpense = expense.slice(0, n - 1);

  const avgSales =
    trainSales.reduce((a, b) => a + b, 0) / trainSales.length;

  const avgExpense =
    trainExpense.reduce((a, b) => a + b, 0) / trainExpense.length;

  const actualSales = sales[n - 1];

  const accuracy =
    actualSales === 0
      ? 0
      : 100 - (Math.abs(actualSales - avgSales) / actualSales) * 100;

  return {
    sales: Math.round(avgSales),
    expense: Math.round(avgExpense),
    profit: Math.round(avgSales - avgExpense),
    accuracy: Math.max(0, Math.round(accuracy)),
    confidence: Math.max(0, Math.round(accuracy))
  };
};
