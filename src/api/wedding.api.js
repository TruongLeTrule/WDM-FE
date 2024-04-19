import axiosClient from './axiosClient';

export const getWeddings = () => {
  return axiosClient.get('wedding');
};

export const getWeddingById = (id, includedBill = false) => {
  return axiosClient.get(`wedding/${id}`, { params: { bill: includedBill } });
};

export const createWedding = (dataCreate) => {
  return axiosClient.post('wedding/create/wedding', dataCreate);
};

export const orderFood = (weddingId, foods) => {
  return axiosClient.post('wedding/create/wedding/food', { weddingId, foods });
};

export const orderService = (weddingId, services) => {
  return axiosClient.post('wedding/create/wedding/service', {
    weddingId,
    services,
  });
};

export const depositOrder = (weddingId, transaction_amount) => {
  return axiosClient.post('wedding/deposit', { weddingId, transaction_amount });
};

export const fullPayOrder = (weddingId, transaction_amount) => {
  return axiosClient.post('wedding/full-pay', {
    weddingId,
    transaction_amount,
  });
};

export const togglePenalty = (weddingId) => {
  return axiosClient.patch('wedding/toggle-penalty', { params: { weddingId } });
};
