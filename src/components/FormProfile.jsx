function FormProfile({ children, onSubmit, submit }) {
    return (
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                <form
                    onSubmit={onSubmit}>
                    {children}
                    <button
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full my-5">
                        {submit}
                    </button>
                </form>
            </div>
        </div>);
}

export default FormProfile;