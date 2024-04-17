import axiosClient from "./axiosClient"

export const getUsers = () => {
  return axiosClient.get('users');
};

export const findUserByName = (name) => {
  return axiosClient.get('users/find', { params: { name, }, });
};

export const updateUserDisplayName = (id, display_name) => {
  return axiosClient.patch(`users/${id}/update`, { display_name });
};

