import InputLogin from "../components/InputLogin";
import TitleForm from "../components/TitleForm";
import FormLogin from "../components/FormLogin";
import NavLogin from "../components/NavLogin";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { alert, setAlert, showAlert, getShowAlert } = useAlert();
    const {setAuth} = useAuth();
    // console.log(auth)
    const navigate = useNavigate();


    const handleSubmit= async (e)=>{
        e.preventDefault();
        if([email, password].includes('')){
            setAlert({
                message: 'All field are requeried',
                error: true
            });
            getShowAlert();
            return;
        }
        
        try {
            const url = `/veterinarios/login`;
            const {data} = await clientAxios.post(url, {email, password});
            console.log(data)
            localStorage.setItem('token', data.token);
            setAuth(data);
            console.log('NAVIGATE!')
            navigate('/admin');

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
                title='Inicia sesión y administra tus'
                post='Pacientes' />
            <div>
                <FormLogin 
                    onSubmit={handleSubmit}>
                    {showAlert && <Alert alert={alert}/>}
                    <InputLogin
                        type='email'
                        text='Email'
                        placeholder='Ingresa tu email'
                        onChange={e=> setEmail(e.target.value)}
                        value={email}
                    />
                    <InputLogin
                        type='password'
                        text='Password'
                        placeholder='Tu password'
                        onChange={e=> setPassword(e.target.value)}
                        value={password}
                    />
                </FormLogin>
                <NavLogin 
                    to='/registrar'
                    first='¿No tienes una cuenta? Regístrate!'
                />
            </div>
        </>
    );
}

export default Login;