import TitleForm from "../components/TitleForm";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";

function Confirm() {
    const { id } = useParams();
    const [userConfirm, setUserConfirm] = useState(false);
    const [load, setload] = useState(true);
    const { alert, setAlert, showAlert } = useAlert();

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`;
                const { data } = await clientAxios(url);
                setUserConfirm(true);
                setAlert({
                    message: data.msg
                });

            } catch (error) {
                const { msg } = error.response.data;
                setAlert({
                    message: msg,
                    error: true
                });
            } 
            setload(false);
            
        }
        confirmAccount();
    }, []);

    return (
        <>
            <TitleForm
                title='Confirma tu cuenta y empieza a administrar '
                post='tus pacientes'/>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!load && <Alert alert={alert} />}
                {userConfirm ? (
                    <Link
                        to={'/'}
                        className="block text-center my-5 text-gray-500 bg-indigo-500 w-1/4 px-5 py-2 font-normal hover:opacity-90 rounded text-white m-auto"
                    >
                        Iniciar sesión
                    </Link>
                ) : <p className="text-center text-gray-500">Tu token ya ha expirado, lo siento</p>
            }
            </div>
        </>
    );
}

export default Confirm;