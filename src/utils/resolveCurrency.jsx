const moneyAttribute = [
  'pricePerTable',
  'serviceFee',
  'total',
  'deposit',
  'remainder',
  'extraFee',
  'minPrice',
];

export default (data) => {
  if (moneyAttribute.includes(data)) return '$';
};
