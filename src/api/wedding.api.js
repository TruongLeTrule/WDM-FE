import axiosClient from './axiosClient';

export const searchWeddingsByPhone = (phone) => {
  return axiosClient.get('wedding/find', {
    params: {
      phone,
    },
  });
};

export const searchWeddingsByDateForLob = (date, shiftList, lobbyId) => {
  return axiosClient.post('wedding/find-by-date-lob?', {
    date,
    shiftList,
    lobbyId
  });
};

export const searchWeddingsByDateForReport = (date) => {
  return axiosClient.post('wedding/find-by-date-report?', {
    date
  });
};

export const getWeddings = (bill = false) => {
  return axiosClient.get('wedding', {
    params: {
      bill,
    },
  });
};

export const getWeddingById = (id, includedBill = false) => {
  return axiosClient.get(`wedding/${id}`, { params: { bill: includedBill } });
};

export const createWedding = (dataCreate) => {
  return axiosClient.post('wedding/create/wedding', dataCreate);
};

export const editWedding = (weddingID, dataEdit) => {
  return axiosClient.post(`wedding/edit/wedding/${weddingID}`, dataEdit);
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
  return axiosClient.patch(`wedding/toggle-penalty?weddingId=${weddingId}`);
};

export const getFoodsOrder = (weddingId) => {
  return axiosClient.get('wedding/get/food-order', { params: { weddingId } });
};

export const getServicesOrder = (weddingId) => {
  return axiosClient.get('wedding/get/service-order', {
    params: { weddingId },
  });
};

export const getWeddingCurrentTotalDeposit = (weddingId) => {
  return axiosClient.get(`wedding/total-deposit/${weddingId}`);
};

export const editFoodsOrder = (weddingId, foods) => {
  return axiosClient.post(`wedding/update/wedding/food`, { foods, weddingId });
};

export const editServicesOrder = (weddingId, services) => {
  return axiosClient.post(`wedding/update/wedding/service`, {
    services,
    weddingId,
  });
};

export const getExtraFee = (weddingId) => {
  return axiosClient.get(`wedding/extra_fee/${weddingId}`);
};
