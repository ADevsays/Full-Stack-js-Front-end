import { formatDate } from "../helpers/formatDate";
import usePacients from "../hooks/usePacients";

function Pacient({ pacient }) {

    const {setEdition, deletePacient} = usePacients();

    const { email, date, name, owner, symptoms, _id } = pacient;

    const arrayToMap = [
        { text: 'Nombre ', label: name },
        { text: 'Email ', label: email },
        { text: 'Propietario ', label: owner },
        { text: 'Fecha ', label: formatDate(date) },
        { text: 'Sintomas ', label: symptoms }
    ];

    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            {arrayToMap.map((data, i) =>
                <p key={Math.random() * i} className="font-bold uppercase mb-2 text-indigo-700">{data.text}: <span className="text-black font-medium normal-case">{data.label}</span></p>)
            }
            <div className="flex justify-between my-5">
                <button 
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
                    onClick={()=> setEdition(pacient)}>
                    Editar
                    </button>
                <button
                    onClick={()=> deletePacient(_id)} 
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg">
                        Eliminar
                    </button>
            </div>
        </div>
    );
}

export default Pacient;
