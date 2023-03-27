import FormPacients from "../components/FormPacients";
import ListPacients from "../components/ListPacients";
import {useState} from 'react';

function AdminPacients() {
    const [showForm, setShowForm] = useState(true);
    
    return (
        <main className="flex flex-col md:flex-row">
            <button
                className="md:hidden block bg-indigo-800 m-5 text-white font-bold w-1/2 md:w-2/5 mx-auto rounded py-2"
                onClick={()=> setShowForm(!showForm)}
            >
                {showForm ? 'Mostrar formulario' : 'Ocultar formulario'}
            </button>
            <div className={`${showForm ? 'hidden' : 'block'} md:block md:w-1/2 lg:w-2/4`}>
                <FormPacients/>
            </div>
            <div className="md:w-1/2 lg:w-2/4">
                <ListPacients/>
            </div>
        </main>
    );
}

export default AdminPacients;