function InputProfile({label, name, type="text", value, onChange, placeholder}) {
    return (
        <div className="my-3">
            <label className="uppercase font-bold text-gray-600">
                {label}
            </label>
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type={type}
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name={name}
            />
        </div>
    );
}

export default InputProfile;