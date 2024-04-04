export const orderInfoLeft = [
  { title: 'groom', key: 'groom' },
  { title: 'bride', key: 'bride' },
  { title: 'phone', key: 'phone' },
  { title: 'order date', key: 'orderDate' },
  { title: 'occur date', key: 'occurDate' },
];

export const orderInfoRight = [
  { title: 'total table', key: 'totalTable' },
  { title: 'price/table', key: 'pricePerTable', link: '/' },
  { title: 'service fee', key: 'serviceFee', link: '/' },
  { title: 'total', key: 'total' },
  { title: 'deposit', key: 'deposit' },
  { title: 'remainder', key: 'remainder' },
];

export const editOrderLeft = [
  { title: 'groom', key: 'groom', type: 'input' },
  { title: 'bride', key: 'bride', type: 'input' },
  { title: 'phone', key: 'phone', type: 'input' },
  { title: 'order date', key: 'orderDate', type: 'date' },
  { title: 'occur date', key: 'occurDate', type: 'date' },
];

export const editOrderRight = [
  { title: 'total table', key: 'totalTable', type: 'input' },
  { title: 'price/table', key: 'pricePerTable', link: '/' },
  { title: 'service fee', key: 'serviceFee', link: '/' },
  { title: 'total', key: 'total' },
  { title: 'deposit', key: 'deposit' },
  { title: 'remainder', key: 'remainder' },
];

export const payRemainderOverall = [
  { title: 'total table', key: 'totalTable' },
  { title: 'price/table', key: 'pricePerTable' },
  { title: 'service fee', key: 'serviceFee' },
  { title: 'total', key: 'total' },
  { title: 'deposit', key: 'deposit' },
  { title: 'extra fee', key: 'extraFee' },
  { title: 'remainder', key: 'remainder' },
];

export const payRemainderPayment = [
  { title: 'cash', key: 'payMethod', type: 'radio', optionValue: 'cash' },
  {
    title: 'internet banking',
    key: 'payMethod',
    type: 'radio',
    optionValue: 'bank',
  },
];
