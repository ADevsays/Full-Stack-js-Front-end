import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import FormProfile from "../components/FormProfile";
import InputProfile from "../components/InputProfile";
import ProfileTitle from "../components/ProfileTitle";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

function ChangePassword() {
    const { alert, setAlert, showAlert, getShowAlert } = useAlert();
    const {savePassword} = useAuth();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const inputValues = [
        { label: 'Password actual', place: 'Ingresa tu password actual', fn:setPassword },
        { label: 'Nuevo password', place: 'Ingresa tu nuevo password', fn:setNewPassword },
    ]

    const hasError=(message)=>{
        setAlert({
            message: message,
            error:true
        });
        getShowAlert();
         
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if([password, newPassword].includes('')){
            hasError('All fields are required');
            return 
        }
        if(newPassword.length < 6){
            hasError('The password must be min 6 characteres ');
            return 
        }
        const result = await savePassword({password, newPassword});
        setAlert(result);
        getShowAlert();
        if(!result.error){
            setTimeout(()=>{
                navigate('/admin');
            }, 3000);
        }
        
    }
    return (
        <>
            <AdminNav />
            <ProfileTitle
                h1="Cambiar password"
                p="Modifica tu"
                span="Password aqui"
            />
            <FormProfile
                onSubmit={handleSubmit}
                submit='Cambiar password'>
                {showAlert && <Alert alert={alert}/>}
                {
                    inputValues.map(value =>
                        <InputProfile
                            key={value.label}
                            type='password'
                            label={value.label}
                            placeholder={value.place}
                            onChange={e=> value.fn(e.target.value)}
                        />
                    )
                }
            </FormProfile>
        </>
    );
}

export default ChangePassword;

