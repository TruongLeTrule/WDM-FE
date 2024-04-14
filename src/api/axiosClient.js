import axios from "axios";
import { API_BASE_URL } from "../config/base_url.js";


const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'content-type': 'application/json',
    }
})

// Request interceptor to insert auth token if available
axiosClient.interceptors.request.use(
  config => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOiJKSXJXRTFxUmpUeEJXemVGd0lHR0wiLCJwZXJtaXNzaW9uTGlzdCI6W3siaWQiOiJwZXJtMSIsIm5hbWUiOiJWaWV3IFJlcG9ydCIsImRlc2NyaXB0aW9uIjoiQWxsb3dzIHZpZXdpbmcgcmVwb3J0cyIsInBhZ2UiOiJyZXBvcnQiLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0xM1QwMDozNjo0OS4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMTNUMDA6MzY6NDkuMDAwWiJ9LHsiaWQiOiJwZXJtMiIsIm5hbWUiOiJFZGl0IFVzZXIiLCJkZXNjcmlwdGlvbiI6IkFsbG93cyBlZGl0aW5nIHVzZXJzIiwicGFnZSI6InVzZXIiLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0xM1QwMDozNjo0OS4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMTNUMDA6MzY6NDkuMDAwWiJ9LHsiaWQiOiJwZXJtMyIsIm5hbWUiOiJBY2Nlc3MgTG9iYnkiLCJkZXNjcmlwdGlvbiI6IkFsbG93cyBhY2Nlc3MgdG8gbG9iYnkiLCJwYWdlIjoibG9iYnkiLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0xM1QwMDozNjo0OS4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMTNUMDA6MzY6NDkuMDAwWiJ9LHsiaWQiOiJwZXJtNCIsIm5hbWUiOiJQcm9jZXNzIE9yZGVycyIsImRlc2NyaXB0aW9uIjoiQWxsb3dzIHByb2Nlc3Npbmcgb3JkZXJzIiwicGFnZSI6Im9yZGVyIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDQtMTNUMDA6MzY6NDkuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA0LTEzVDAwOjM2OjQ5LjAwMFoifSx7ImlkIjoicGVybTUiLCJuYW1lIjoiTWFuYWdlIEZvb2QgU2VydmljZSIsImRlc2NyaXB0aW9uIjoiQWxsb3dzIG1hbmFnaW5nIGZvb2Qgc2VydmljZSIsInBhZ2UiOiJmb29kX3NlcnZpY2UiLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0xM1QwMDozNjo0OS4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMTNUMDA6MzY6NDkuMDAwWiJ9XSwiaWF0IjoxNzEzMDk2MDc3LCJleHAiOjE3MTMwOTk2Nzd9.MrWb8e0El5x7fS0p7stVW-SwJrdYaVowYR00tm8Hj54"
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosClient.interceptors.request.use(async config => {
    return config;
  },
  error => {
    Promise.reject(error)
})

axiosClient.interceptors.response.use((res) => {
    if( res && res.data ){
      return res
    }

    return res
}, error => {
    // throw error
    // console.log(error.response);
    return error.response
})

export default axiosClient