const moneyAttribute = [
  'pricePerTable',
  'serviceFee',
  'total',
  'deposit',
  'remainder',
  'extraFee',
  'min_table_price',
  'requiredDeposit',
  'totalPrice',
  'deposit_amount',
  'servicePrice',
  'foodPrice',
  'remain',
];

export default (data) => {
  if (moneyAttribute.includes(data)) return '$';
};
