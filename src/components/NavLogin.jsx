import { Link } from "react-router-dom";

function NavLogin({to, first, second='¿Olvidaste tu password?', to2="/recuperar-password"}) {
    return (
        <nav className="mt-4 lg:flex lg:justify-around">
            <Link
                to={to}
                className="block text-center my-5 text-gray-500">
                {first}
            </Link>
            <Link
                to={to2}
                className="block text-center my-5 text-gray-500">
                {second}
            </Link>
        </nav>
    );
}

export default NavLogin;