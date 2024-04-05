export const orderInfoLeft = [
  { title: 'groom', key: 'groom' },
  { title: 'bride', key: 'bride' },
  { title: 'phone', key: 'phone' },
  { title: 'order date', key: 'orderDate' },
  { title: 'occur date', key: 'occurDate' },
];

export const orderInfoRight = [
  { title: 'total table', key: 'totalTable' },
  { title: 'price/table', key: 'pricePerTable', openModal: 'food' },
  { title: 'service fee', key: 'serviceFee', openModal: 'service' },
  { title: 'total', key: 'total' },
  { title: 'deposit', key: 'deposit' },
  { title: 'remainder', key: 'remainder' },
];

export const editOrderLeft = [
  { title: 'groom', key: 'groom', type: 'text-input' },
  { title: 'bride', key: 'bride', type: 'text-input' },
  { title: 'phone', key: 'phone', type: 'text-input' },
];

export const datePickArr = [
  { title: 'order date', key: 'orderDate', type: 'date' },
  { title: 'occur date', key: 'occurDate', type: 'date' },
];

export const editOrderRight = [
  { title: 'total table', key: 'totalTable', type: 'text-input' },
  { title: 'price/table', key: 'pricePerTable', openModal: 'food' },
  { title: 'service fee', key: 'serviceFee', openModal: 'service' },
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

export const paymentMethodRadio = [
  { title: 'cash', key: 'payMethod', type: 'radio', optionValue: 'cash' },
  {
    title: 'internet banking',
    key: 'payMethod',
    type: 'radio',
    optionValue: 'bank',
  },
];

export const getUserInfo = [
  {
    key: 'groom',
    title: 'groom',
  },
  {
    key: 'bride',
    title: 'bride',
  },
  {
    key: 'phone',
    title: 'contact phone',
  },
  {
    key: 'totalTable',
    title: 'total table',
  },
];

export const paymentOverall = [
  {
    key: 'totalTable',
    title: 'total table',
  },
  {
    key: 'pricePerTable',
    title: 'price/table',
  },
  {
    key: 'serviceFee',
    title: 'service fee',
  },
];

export const paymentOption = [
  { title: 'deposit', key: 'payOption', value: 'deposit' },
  { title: 'pay in full', key: 'payOption', value: 'full' },
];