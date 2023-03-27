function ProfileTitle({h1, p, span}) {
    return (
        <>
            <h1 className="font-black text-3xl text-center mt-10">{h1}</h1>
            <p className="text-xl mt-5 mb-10 text-center">
                {p} <span className="text-indigo-600 font-bold"> {span}</span>
            </p>
        </>
    );
}

export default ProfileTitle;