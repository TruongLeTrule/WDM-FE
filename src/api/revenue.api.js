import axiosClient from "./axiosClient"

export const getTotalRevenue = () => {
  return axiosClient.get('revenue/total');
};

export const getMonRevenue = (year, month) => {
  return axiosClient.get('revenue', {
    params: { year, month, },
  });
};

export const getMonthWedding = (year, month) => {
  return axiosClient.get('revenue/wedding-number', {
    params: { year, month, },
  });
};

export const getListRevenue = () => {
  return axiosClient.get('revenue/list-revenue');
};
