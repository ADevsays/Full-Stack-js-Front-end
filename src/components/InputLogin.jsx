
function InputLogin({type='text', placeholder, text, value, onChange, htmlFor}) {
    return (
        <div className="mt-5">
            <label
                htmlFor={htmlFor}
                className="uppercase text-gray-600 block text-xl font-bold">
                    {text}
            </label>
            <input
                id={htmlFor}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border w-full p-3 mt-3 bg-gray-200 rounded-xl"
            />
        </div>
    );
}

export default InputLogin;