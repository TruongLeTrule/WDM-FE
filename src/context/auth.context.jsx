import { useNavigate } from "react-router";
// import { auth } from "~/api/auth.api";

import { createContext, useState, useEffect } from "react";

const AuthContext = createContext()

export const AuthProvider = (p) => {

    const { children } = p
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    const navigate = useNavigate()

    useEffect(() => {
        const getToken = () => {
            const token = localStorage.getItem('token')
            setToken(token)
        }
        getToken()
    },[])

    useEffect(() => {
        const checkToken = () => {// check valid token (not valid ==> call logout)


            // token && auth.checkToken(`${token}`)
            // .then(({data}) => {
            //     console.log(data)

            //     if(!data.token) {
            //         logOut()
            //     }

            // }).catch(err => {
            //     console.log(err)
            // })  
        }

        checkToken()
    }, [token]);

    const logOut = () => {
        localStorage.removeItem('token')
        window.history.pushState(null, '', '/');
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{token, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext