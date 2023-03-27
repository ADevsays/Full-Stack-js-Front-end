import FormLogin from "../components/FormLogin";
import InputLogin from "../components/InputLogin";
import NavLogin from "../components/NavLogin";
import TitleForm from "../components/TitleForm";
import { useState } from "react";
import Alert from "../components/Alert";
import useAlert from "../hooks/useAlert";
import clientAxios from "../config/axios";

const userDataConfig = {
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
};

function Register() {
    const [userData, setUserData] = useState(userDataConfig);
    const { alert, setAlert, showAlert, getShowAlert } = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, repeatPassword } = userData;
        if (Object.values(userData).includes('')) {
            setAlert({
                message: 'There are field empty', error: true
            });
            getShowAlert();
            return;
        } else if (password !== repeatPassword) {
            setAlert({
                message: 'The password is not equal', error: true
            });
            getShowAlert();
            return;
        } else if (password.length < 6) {
            console.log('The password is not enought large');
            setAlert({
                message: 'The password is not enought large, min 6 characters', error: true
            });
            getShowAlert();
            return;
        }


        //Set values into our backend
        try {
            // const urlTest = '/veterinaries';
            
            const url = `/veterinarios`;
            await clientAxios.post(url, userData);

            setAlert({ message: 'User created successfully, check your email to confirm' });
            getShowAlert();

        } catch (error) {
            console.error(error.message);
            const { msg } = error.response.data;
            setAlert({ message: msg, error: true });
            getShowAlert();
        }

    }

    return (
        <>
            <TitleForm
                title='Crea tu cuenta y administra '
                post='tus pacientes' />
            <div>
                <FormLogin
                    onSubmit={handleSubmit}
                    submit="Regístrate">
                    {showAlert && <Alert alert={alert} />}

                    <InputLogin
                        text='Nombre'
                        placeholder='Tu nombre'
                        value={userData.name}
                        onChange={e => setUserData({
                            ...userData,
                            name: e.target.value
                        })}
                    />

                    <InputLogin
                        type="email"
                        text='email'
                        placeholder='Tu email'
                        value={userData.email}
                        onChange={e => setUserData(
                            {
                                ...userData,
                                email: e.target.value
                            })}
                    />

                    <InputLogin
                        type="password"
                        text='Contraseña'
                        placeholder='Tu contraseña'
                        value={userData.password}
                        onChange={e => setUserData(
                            {
                                ...userData,
                                password: e.target.value
                            })
                        }
                    />

                    <InputLogin
                        type="password"
                        text='Repite tu contraseña'
                        placeholder='Repite tu contraseña'
                        value={userData.repeatPassword}
                        onChange={e => setUserData(
                            {
                                ...userData,
                                repeatPassword: e.target.value
                            })}
                    />

                </FormLogin>
                <NavLogin
                    to='/'
                    first='¿Ya tienes una cuenta? Inicia sesión'
                />
            </div>

        </>
    );
}

export default Register;