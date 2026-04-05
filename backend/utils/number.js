exports.toNumber = (val) => {
    if (val === null || val === undefined) return 0;
  
    // remove ₹ , spaces
    const cleaned = String(val).replace(/[₹, ]/g, "");
  
    const num = Number(cleaned);
    return isNaN(num) ? 0 : num;
  };
  