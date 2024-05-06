import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../api/auth.api";
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext(null);

export const AuthProvider = (p) => {
  const { children } = p;
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState({})
  const [permissionList, setPermissionList] = useState([])

  const navigate = useNavigate();
  useEffect(() => {
    const getToken = () => {
      const token = localStorage.getItem("token");
      setToken(token);
      const decoded = jwtDecode(token);
      console.log(decoded)
      setRole(decoded.role)
      setPermissionList(decoded.permissionList)
    };
    getToken();
  }, []);

  useEffect(() => {
    const checkToken = () => {
      verifyToken()
        .catch((err) => {
          console.log(err);
          logOut();
        });
    };

    checkToken();
  }, [token]);

  const logOut = () => {
    localStorage.removeItem("token");
    window.history.pushState(null, "", "/");
    navigate("/");
  };


  const value = {
    logOut,
    role,
    permissionList
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
