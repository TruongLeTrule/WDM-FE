const moneyAttribute = [
  'pricePerTable',
  'serviceFee',
  'total',
  'deposit',
  'remainder',
  'extraFee',
  'min_table_price',
];

export default (data) => {
  if (moneyAttribute.includes(data)) return '$';
};
