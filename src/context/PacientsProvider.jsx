import { createContext, useEffect, useState } from "react";
import clientAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

export const PacientsContext = createContext();

export function PacientsProvider({children}){
    const {auth} = useAuth();
    const [pacients, setPacients] = useState([]);
    const [pacient, setPacient] = useState({});

    const token = localStorage.getItem('token');
    const configAxios= {
        headers:{
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }


    useEffect(()=>{
        const getPacients = async ()=>{
            const token = localStorage.getItem('token');
            const configAxios= {
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                if(!token) return;

                const {data} = await clientAxios('/pacientes', configAxios);

                setPacients(data)

            } catch (error) {
                console.error(error);
            }
        }
        getPacients();
    }, [auth]);

    const savePacient = async (pacient)=>{
        if(pacient.id){
            try {
                const {data} = await clientAxios.put(`/pacientes/${pacient.id}`, pacient, configAxios, pacient, configAxios);
                const pacientsUpdate = pacients.map(pacientState=> pacientState._id === data._id ? data : pacientState);
                setPacients(pacientsUpdate);
            } catch (error) {
                console.error(error);
            }
            return;
        }
        try {
            const {data} = await clientAxios.post('/pacientes', pacient, configAxios);
            const {__v, createdAt, updateAt, ...newPacient} = data;
            setPacients([newPacient, ...pacients]);
        } catch (error) {
            console.error(error);
        }
    };

    const setEdition = (pacient)=>{
        setPacient(pacient)
    }

    const deletePacient = async (id)=>{
        const confirmed = confirm('Are you sure that delete this pacient?');

        if(!confirmed) return;

        try {
            await clientAxios.delete(`/pacientes/${id}`, configAxios);
            const pacientesUpadate = pacients.filter(pacientState => pacientState._id !== id);
            setPacients(pacientesUpadate);
        } catch (error) {
            
        }
    }

    return(
        <PacientsContext.Provider
            value={{
                pacients,
                savePacient,
                setEdition,
                pacient,
                deletePacient
            }}>
            {children}
        </PacientsContext.Provider>
    );
}