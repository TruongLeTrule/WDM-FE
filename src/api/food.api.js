import axiosClient from "./axiosClient"

export const getFoods = () => {
  return axiosClient.get('food');
};

export const getFoodById = (id) => {
  return axiosClient.get(`food/${id}` );
};

/**
const createData = {
  "name": "HotDog",
  "price": 10,
  "status": false,
  "inventory": 100
}
 */
export const createFood = (createData) => {
  return axiosClient.post('food/create', createData);
};

/**
const updateData = {
  "name": "HotDog",
  "price": 10,
  "status": false,
  "inventory": 100
}
 */
export const updateFood = (id, updateData) => {
  return axiosClient.patch(`food/${id}`, updateData);
}

export const deleteFood = (id) => {
  return axiosClient.delete(`food/${id}`);
}