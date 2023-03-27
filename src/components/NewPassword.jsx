import { useEffect, useState } from "react";
import FormLogin from "./FormLogin";
import InputLogin from "./InputLogin";
import TitleForm from "./TitleForm";
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAlert from "../hooks/useAlert";
import Alert from "./Alert";
import clientAxios from "../config/axios";
function NewPassword() {
    const [password, setPassword] = useState('');
    const [isValidToken, setIsValidToken] = useState(false);
    const { alert, setAlert, showAlert, getShowAlert, setShowAlert } = useAlert();
    const { token } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {

            try {
                const url = `/veterinarios/olvide-password/${token}`;

                await clientAxios(url);

                setAlert({
                    message: 'Set a new password'
                });
                getShowAlert();
                setIsValidToken(true);

            } catch (error) {
                setAlert({
                    message: 'Have a error with you auth',
                    error: true
                });
                setShowAlert(true);
            }

        }
        checkToken();
    }, []);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(password.length < 6){
            setAlert({
                message: 'The password could be higher than 5 characteres',
                error: true
            });
            getShowAlert();
            return;
        }
        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const {data } = await clientAxios.post(url, {password});
            setAlert({
                message: data.msg
            });
            navigate('/');
            getShowAlert();
        } catch (error) {
            const {msg} = error.response.data;
            setAlert({
                message: msg,
                error: true
            });
            getShowAlert();
        }
    }

    return (
        <>
            <TitleForm
                title='Reestablece tu acesso y no pierdas'
                post='tus pacientes'
            />
            <div>
                {showAlert && <Alert alert={alert} />}
                {isValidToken ?
                    <FormLogin
                        submit='Reestablecer password'
                        onSubmit={handleSubmit}
                    >
                        <InputLogin
                            type='password'
                            onChange={e => setPassword(e.target.value)}
                            text='Tu nuevo password'
                            placeholder='Registra tu nueva pasword' />
                    </FormLogin>
                    : <Link 
                        to='/'
                        className="bg-indigo-700 border-none w-full rounded-xl text-white uppercase py-3 px-10 font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                        >
                            Regresa al inicio
                        </Link>   
                }
            </div>


        </>
    );
}

export default NewPassword;