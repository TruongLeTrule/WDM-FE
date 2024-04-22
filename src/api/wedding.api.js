import axiosClient from './axiosClient';

export const searchWeddingsByPhone = (phone) => {
  return axiosClient.get('wedding/find', {
    params: {
      phone
    }
  });
};

export const getWeddings = (bill=false) => {
  return axiosClient.get('wedding', {
    params: {
      bill
    }
  });
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
  return axiosClient.post(`wedding/update/wedding/food`, { foods, weddingId });
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
  return axiosClient.post(`wedding/update/wedding/service`, {
    services,
    weddingId,
  });
};
