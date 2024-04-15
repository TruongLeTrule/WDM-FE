import axiosClient from "./axiosClient"

/*
=================== LOBBY TYPE ===================
*/
export const getLobbyTypes = (includeDeleted=false) => {
  return axiosClient.get('lobby/types',{ params: { includeDeleted } });
};

export const getLobbyTypeByID = (id) => {
  return axiosClient.get(`lobby/type/${id}`);
};

export const createLobType = (createData) => {
  return axiosClient.post('lobby/type/create/', createData);
};

export const updateLobType = (id, updateData) => {
  return axiosClient.patch(`lobby/type/${id}/update`, updateData);
};

export const deleteLobType = (id) => {
  return axiosClient.patch(`lobby/type/${id}/soft-delete`);
};

/*
=================== LOBBY ===================
*/

export const getLobbies = () => {
  return axiosClient.get('lobby');
};

export const getLobbyById = (id) => {
  return axiosClient.get(`lobby/${id}`);
};

export const createLobby = (dataCreate) => {
  return axiosClient.post('lobby/create', dataCreate);
};

export const updateLobby = (id, dataUpdate) => {
  return axiosClient.patch(`lobby/${id}`, dataUpdate);
};

export const softDeleteLobby = (id) => {
  return axiosClient.patch(`lobby/${id}/soft-delete`);
};
