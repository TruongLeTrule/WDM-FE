const moneyAttribute = [
  'pricePerTable',
  'serviceFee',
  'total',
  'deposit',
  'remainder',
  'extraFee',
];

export default (data) => {
  if (moneyAttribute.includes(data)) return '$';
};
