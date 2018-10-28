const stringHelper = {
  toMoney: function (string, currency = '', separator = '.') {
    return Number(string).toFixed(2).replace('.', separator) + currency;
  },
  toPercentage: function (string, separator = '.') {
    return Number(string).toFixed(2).replace('.', separator) + '%';
  }
};

export default stringHelper;
