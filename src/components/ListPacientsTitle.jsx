function ListPacientsTitle({h2, p, span}) {
    return (
        <>
            <h2 className="font-black text-3xl text-center">{h2}</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                {p}
                <span className="text-indigo-600 font-bold"> {span}</span>
            </p>
        </>
    );
}

export default ListPacientsTitle;