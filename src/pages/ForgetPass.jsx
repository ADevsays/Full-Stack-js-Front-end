import { useState } from "react";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
import FormLogin from "../components/FormLogin";
import InputLogin from "../components/InputLogin";
import NavLogin from "../components/NavLogin";
import TitleForm from "../components/TitleForm";
import clientAxios from "../config/axios";

function ForgetPass() {
    const [email, setEmail] = useState('');
    const { alert, setAlert, showAlert,getShowAlert} = useAlert();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(!email){
            setAlert({
                message: 'The email is requeried',
                error:true
            });
            getShowAlert();
            return;
        }

        try {
            const url = `/veterinarios/olvide-password`;
            const {data} = await clientAxios.post(url, {email});
            setAlert({
                message:data.msg
            });
            getShowAlert();
        } catch (error) {
            console.error(error);
            const {msg} = error.response.data;
            setAlert({
                message:msg,
                error: true
            });
            getShowAlert();
        }
    }


    return (
        <>
            <TitleForm 
                title='Recupera tu acceso y no pierdas'
                post='tus pacientes'
                />
            <div>
                <FormLogin 
                    submit="Enviar instrucciones"
                    onSubmit={handleSubmit}>
                    {showAlert && <Alert alert={alert}/>}
                    <InputLogin
                        type="email"
                        text='email'
                        placeholder='Tu email'
                        onChange={e=> setEmail(e.target.value)}
                    />
                </FormLogin>
                <NavLogin
                    to='/'
                    first='¿Ya tienes una cuenta? Inicia sesión'
                    to2='/registrar'
                    second='¿No tienes una cuenta? Regístrate!'
                    />
            </div>
        </>
    );
}

export default ForgetPass;