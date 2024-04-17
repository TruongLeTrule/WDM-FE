import axiosClient from "./axiosClient"

export const getRoles = (permission=true) => {
  return axiosClient.get('privilege/roles', {
    params: {
      permission: permission
    }
  });
};

export const getRoleByID = (id, permission=true) => {
  // permission: boolean (to include permission with the role id )
  return axiosClient.get(`privilege/roles/:${id}`, {
    params: {
      permission: permission
    }
  });
};

export const updatePermissionForRole = (roleID, permissionID) => {
  return axiosClient.post(`privilege/role/update`, {roleID, permissionID});
};

export const removePermissionFromRole = (roleID, permissionID) => {
  return axiosClient.delete(`privilege/role/delete`, {roleID, permissionID});
};

export const createRole = (name, permissionList) => {
  // permissionList data example = [{id: '123213'}, {id: '23213' }]
  return axiosClient.post(`privilege/role`, {name, permissionList});
};

export const checkUserPermissionForPage = (userID, page) => { // return boolean (whether user have permission for specific page [  report, user, lobby, order, food_service])

  return axiosClient.get(`auth/check-permission/${userID}`, {
    params: {
      page
    }
  });
};
