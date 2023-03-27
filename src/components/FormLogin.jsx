function FormLogin({children, submit="Iniciar sesión", onSubmit}) {
    return (
        <form 
            onSubmit={onSubmit}
            className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {children}
            <button
                className="bg-indigo-700 border-none w-full rounded-xl text-white uppercase py-3 px-10 font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto ">
                {submit}
            </button>
        </form>
    );
}

export default FormLogin;