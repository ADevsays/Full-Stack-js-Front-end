import { useEffect, useState } from "react";
import { formatDate } from "../helpers/formatDate";
import useAlert from "../hooks/useAlert";
import usePacients from "../hooks/usePacients";
import Alert from "./Alert";
import InputLogin from "./InputLogin";
import ListPacientsTitle from "./ListPacientsTitle";

const dataUser = {
    name: '',
    owner: '',
    email: '',
    date: '',
    symptoms: ''
}

function FormPacients() {
    const [data, setData] = useState(dataUser);
    const [id, setId] = useState(null);
    const { alert, setAlert, showAlert, getShowAlert } = useAlert();

    const { savePacient, pacient } = usePacients();

    useEffect(() => {
        if (pacient?.name) {
            const { createdAt, updatedAt, veterinaryID, _id, __v, ...editPacient } = pacient;
            setData({ ...editPacient, date: formatDate(pacient.date) });
            setId(pacient._id);
        }
    }, [pacient]);

    const allDataForm = [
        {
            text: 'Nombre mascota',
            placeholder: 'Nombre de la mascota',
            name: 'mascota',
            data: 'name'
        },
        {
            text: 'Propietario',
            placeholder: 'Nombre del propietario',
            name: 'propietario',
            data: 'owner'
        },
        {
            text: 'Email del propietario',
            placeholder: 'Email',
            name: 'email',
            type: 'email',
            data: 'email'
        },
        {
            text: 'Fecha de alta',
            name: 'fecha',
            type: 'date',
            data: 'date'
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(data).includes('')) {
            setAlert({
                message: 'All field are required',
                error: true
            });
            getShowAlert();
            return
        }
        savePacient({...data, id});
        if(id){
            setId(null);
            setAlert({
                message: 'Pacient update correctly',
            });
            getShowAlert();
            setData(dataUser);
        }
    }

    return (
        <div className="m-5">
            <ListPacientsTitle
                h2='Administrador de pacientes'
                p='Añade tus pacientes y '
                span='Administralos'
            />
            <form
                onSubmit={handleSubmit}
                className="px-5 py-2 pb-5 mb-10 lg:mb-0 shadow-md rounded-md bg-white">
                {
                    allDataForm.map(input => {
                        return (<InputLogin
                            key={input.text}
                            type={input.type}
                            text={input.text}
                            value={data[input.data]}
                            placeholder={input.placeholder}
                            htmlFor={input.name}
                            onChange={(e) => {
                                const copyData = { ...data };
                                copyData[input.data] = e.target.value;
                                setData({ ...data, ...copyData });
                            }}
                        />)
                    })
                }

                <div className="mt-5">
                    <label
                        htmlFor="symptom"
                        className="uppercase text-gray-600 block text-xl font-bold">
                        Sintomas
                    </label>
                    <textarea
                        id="symptom"
                        placeholder="Describe los sintomas"
                        className="w-full p-2 bg-gray-200"
                        value={data.symptoms}
                        onChange={e => {
                            setData({ ...data, symptoms: e.target.value });
                        }}
                    />
                </div>
                <button className="rounded-xl mt-5  bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 hover:cursor-pointer">
                    {id ? 'Guardar cambios' : 'Agregar paciente'}
                </button>
                <div className="mt-5">
                    {showAlert && <Alert alert={alert} />}
                </div>
            </form>
        </div>
    );
}

export default FormPacients;