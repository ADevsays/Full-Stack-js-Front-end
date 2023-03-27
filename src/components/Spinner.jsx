import '../spinner.css';

function Spinner() {
    return (
        <div className='w-full container flex items-center justify-center h-screen'>
            <div className="sk-chase h-20 w-20">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        </div>

    );
}

export default Spinner;