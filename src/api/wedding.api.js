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

export const getFoodsOrder = (weddingId) => {
  return axiosClient.get('wedding/get/food-order', { params: { weddingId } });
};

export const getServicesOrder = (weddingId) => {
  return axiosClient.get('wedding/get/service-order', { params: { weddingId } });
};

export const getWeddingCurrentTotalDeposit = (weddingId) => {
  return axiosClient.get(`wedding/total-deposit/${weddingId}`);
};

export const editFoodsOrder = (weddingId, foods) => {
  /**
   * {
    "foods": [
        {
            "id": "w1e2r3t4y5u6i7o8p9a1",
            "count": 11
        },
        {
            "id": "f1g2h3j4k5l6z7x8c9v1",
            "count": 20
        }
    ],
    "weddingId": "a8414b0b-bd8e-4bfe-b2e8-bf7c4051ce0f"
}
   */
  return axiosClient.post(`wedding/update/wedding/food`,{ foods, weddingId, },);
};

export const editServicesOrder = (weddingId, services) => {
  /**
   * {
    "services": [
        {
            "id": "r4T5y6U7i8O9p0A1s2d",
            "count": 2
        }
    ],
    "weddingId": "a8414b0b-bd8e-4bfe-b2e8-bf7c4051ce0f"
}
   */
  return axiosClient.post(`wedding/update/wedding/service`,{ services, weddingId, },);
};


