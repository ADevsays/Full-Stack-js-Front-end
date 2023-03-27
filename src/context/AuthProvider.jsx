import {useState, useEffect, createContext} from 'react';
import clientAxios from '../config/axios';

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [auth, setAuth] = useState({});
    const [load, setLoad] = useState(true);


    useEffect(() => {
        const authUser = async()=>{
            const token = localStorage.getItem('token');
            if(!token) {
                setLoad(false);
                return;
            };

            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`  
                }
            }

            try {
                const url = '/veterinarios/perfil';
                const {data} = await clientAxios(url, axiosConfig);
                setAuth(data.veterinary);

            } catch (error) {
                console.log(error)
                console.error(error.message, "from provider");
                setAuth({});
            }
            setLoad(false);
        }
        authUser();
    }, []);

    const closeSession=()=>{
        localStorage.removeItem('token');
        setAuth({});
    }

    const updateProfile = async (profile)=>{
        const token = localStorage.getItem('token');
            if(!token) {
                setLoad(false);
                return;
            };

            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`  
                }
            }
            try {
                const url = `/veterinarios/perfil/${profile._id}`;
                const {data} = await clientAxios.put(url, profile, axiosConfig);
                return {
                    message: 'Save correctly'
                }
            } catch (error) {
                return {
                    message: error.response.data.msg,
                    error:true
                }
            }
    }

    const savePassword = async (passwordObj)=>{
        const token = localStorage.getItem('token');
        if(!token) {
            setLoad(false);
            return;
        };

        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`  
            }
        }

        try {
            const url = '/veterinarios/actualizar-password';
            const {data} = await clientAxios.put(url, passwordObj, axiosConfig);
            return {
                message: data.msg
            }
        } catch (error) {
            return {
                message: error.response.data.msg,
                error:true
            }
        }

    }

    return (
        <AuthContext.Provider 
            value={{auth, 
                setAuth, 
                load, 
                closeSession,
                updateProfile,
                savePassword}}>
            {children}
        </AuthContext.Provider>
    );
}