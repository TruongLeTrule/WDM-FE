import axiosClient from "./axiosClient"


export const auth = {
    signUp (data) {
        const url = '/auth/signup';

        return axiosClient.post(url, data)
    },
    login (data) {
        const url = '/auth/login';

        return axiosClient.post(url, data)
    },
    checkToken(token) {
        const url = '/check-token';

        return axiosClient.post(url, {
            headers: {
                'authorization': token
            }
        })
    }
}