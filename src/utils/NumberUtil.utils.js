const NumberUtil = {
  isNumber(string) {
    if (typeof string != "string") return false;
    return !isNaN(string) && !isNaN(parseFloat(string));
  },
};

export default NumberUtil;
