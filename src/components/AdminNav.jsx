import { Link } from "react-router-dom";

function AdminNav() {
    return (
        <nav className="flex gap-3 m-5">
            <Link
                to="/admin/perfil"
                className="font-bold uppercase text-gray-500"
            >Perfil</Link>
            <Link
                to="/admin/cambiar-password"
                className="font-bold uppercase text-gray-500"
            >Cambiar password</Link>
        </nav>
    );
}

export default AdminNav;