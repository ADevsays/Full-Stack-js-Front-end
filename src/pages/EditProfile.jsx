import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import FormProfile from "../components/FormProfile";
import InputProfile from "../components/InputProfile";
import ProfileTitle from "../components/ProfileTitle";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

function EditProfile() {
    const { auth, updateProfile } = useAuth();
    const { alert, setAlert, showAlert, getShowAlert } = useAlert();

    const [profile, setProfile] = useState({});

    const inputValues = [
        { label: 'Nombre', name: 'name' },
        { label: 'Sitio web', name: 'web' },
        { label: 'Telefono', name: 'phone' },
        { label: 'Email', name: 'email' },
    ]

    useEffect(() => {
        setProfile(auth);
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email } = profile;
        if ([name, email].includes('')) {
            setAlert({
                message: 'Name or email are required',
                error: true
            });
            getShowAlert();
            return;
        }
        const result = await updateProfile(profile);
        setAlert(result);
        getShowAlert();
    }

    return (
        <>
            <AdminNav />
            <ProfileTitle
                h1="Editar perfil"
                p="Modifca tu "
                span="Información aquí"
            />
            <FormProfile 
                submit='Guardar cambios'
                onSubmit={handleSubmit}>
                {showAlert && <Alert alert={alert}/>}
                {
                    inputValues.map(value =>
                        <InputProfile
                            key={value.name}
                            label={value.label}
                            name={value.name}
                            value={profile[value.name] || ''}
                            onChange={e => {
                                setProfile({
                                    ...profile,
                                    [value.name]: e.target.value
                                })
                            }
                            }
                        />
                    )
                }
                
            </FormProfile>

        </>
    );
}

export default EditProfile;

