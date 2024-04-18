import axiosClient from './axiosClient';

/*
=================== LOBBY TYPE ===================
*/
export const getLobbyTypes = (includeDeleted = false) => {
  return axiosClient.get('lobby/types', { params: { includeDeleted } });
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

export const getLobbies = (date, lob_type_id) => {
  const params = {};
  if (date) {
    params.date = params;
  }
  if (lob_type_id) {
    params.lob_type_id = lob_type_id;
  }

  return axiosClient.get('lobby', {
    params,
  });
};

export const getLobbyById = (id, includeDeleted = false) => {
  return axiosClient.get(`lobby/${id}`, {
    params: { includeDeleted },
  });
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
