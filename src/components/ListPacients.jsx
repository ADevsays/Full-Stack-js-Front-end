import usePacients from "../hooks/usePacients";
import ListPacientsTitle from "./ListPacientsTitle";
import Pacient from "./Pacient";

function ListPacients() {
    const { pacients } = usePacients();
    return (
        <div className="mt-5">
            {pacients.length ? (
                <>
                    <ListPacientsTitle
                        h2='Listado de pacientes'
                        p='Administra tus '
                        span='pacientes'
                    />
                    {
                        pacients.map(pacient =>
                            <Pacient
                                key={pacient._id}
                                pacient={pacient}
                            />
                        )
                    }
                </>
            ) : (
                <>
                    <ListPacientsTitle
                        h2='No hay pacientes todavía'
                        p='Comienza agregando pacientes'
                        span='y los vas a ver en este lugar'
                    />
                </>
            )}
        </div>
    );
}

export default ListPacients;