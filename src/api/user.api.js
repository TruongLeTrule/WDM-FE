import axiosClient from "./axiosClient"

export const getUsers = () => {
  return axiosClient.get('users');
};

export const findUserByUserName = (username) => {
  return axiosClient.get('users/find', { params: { username } });
};

export const updateUserDisplayName = (id, display_name) => {
  return axiosClient.patch(`users/${id}/update`, { display_name });
};

export const deleteUser = (id) => {
  return axiosClient.delete(`users/${id}/delete`);
};