import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {
    const communClasses = 'text-white text-xl uppercase font-bold';
    const {closeSession} = useAuth();

    return (
        <header className="p-10 bg-indigo-600">
            <div className="container mx-auto flex lg:flex-row flex-col justify-between items-center">
                <h1 className="text-center font-bold text-2xl text-indigo-200">APV - Administrador de pacientes de <span className="text-white"> Veterinaria</span></h1>
                <nav className="flex gap-4 mt-5 lg:mt-0 flex-col lg:flex-row items-center">
                    <Link to={'/admin'} className={communClasses} >Pacientes</Link>
                    <Link to={'/admin/perfil'} className={communClasses} >Perfil</Link>
                    <button
                        className={communClasses}
                        onClick={closeSession}
                        >Cerrar sesión</button>
                </nav>
            </div>

        </header>
    );
}

export default Header;