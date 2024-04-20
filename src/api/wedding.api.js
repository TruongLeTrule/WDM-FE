import axiosClient from './axiosClient';

export const getWeddings = () => {
  return axiosClient.get('wedding/list');
};

export const getWeddingById = (id, includedBill = false) => {
  return axiosClient.get(`wedding/${id}`, { params: { bill: includedBill } });
};

export const createWedding = (dataCreate) => {
  return axiosClient.post('wedding/create/wedding', dataCreate);
};

export const editWedding = (weddingID, dataEdit) => {
/*
Param: weddingID
Body: {
    "lobby_id"?: "FgHiJk1-LmNo-2PqRs-3TuVw",
    "groom"?: "T",
    "bride"?: "M",
    "phone"?: "1234565142",
    "wedding_date"?: "Mon Apr 15 2024 19:58:15 GMT+0700 (Indochina Time)",
    "note"?: "hello world 3",
    "shift"?: "evening", // require [evening, noon]
    "table_count"?: 15
}
? is optinal - Add what want to edit
*/

  return axiosClient.post(`wedding/edit/wedding/${weddingID}`, dataEdit);
};

export const orderFood = (weddingId, foods) => {
  return axiosClient.post('wedding/create/wedding/food', { weddingId, foods });
};

export const orderService = (weddingId, services) => {
  return axiosClient.post('create/wedding/service', { weddingId, services });
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
