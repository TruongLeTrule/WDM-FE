import axiosClient from "./axiosClient"

export const getWeddings = () => {
  return axiosClient.get('wedding/list');
};

export const getWeddingById = (id, includedBill=false) => {
  return axiosClient.get(`wedding/${id}`,{ params: { bill: includedBill, }, });
};

export const createWedding = (dataCreate) => { //step 1 
  return axiosClient.post('wedding/create', dataCreate);
};

export const orderFood = (weddingId, foods) => { // 2
  return axiosClient.post('create/wedding/food', { weddingId, foods });
};

export const orderService = (weddingId, services) => {
  return axiosClient.post('create/wedding/service', { weddingId, services });
};

export const depositOrder = (weddingId, transaction_amount) => {
  return axiosClient.post('wedding/deposit', { weddingId, transaction_amount });
};

export const fullPayOrder = (weddingId, transaction_amount) => {
  return axiosClient.post('wedding/full-pay', { weddingId, transaction_amount });
};

export const togglePenalty = (weddingId) => {
  return axiosClient.patch('wedding/toggle-penalty', { params: { weddingId, }, },);
};

