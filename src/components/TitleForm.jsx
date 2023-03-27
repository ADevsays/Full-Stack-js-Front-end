function TitleForm({title, post}) {
    return (
        <div>
            <h1 className="text-indigo-600 font-black text-6xl w-full">{title} <span className="text-black">{post}</span></h1>
        </div>
    );
}

export default TitleForm;