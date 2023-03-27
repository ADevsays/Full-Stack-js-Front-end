import { useState } from "react";

export default function useAlert(){
    const [alert, setAlert] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const getShowAlert=()=>{
        setShowAlert(true);
        setTimeout(()=>{
            setShowAlert(false);
        }, 2000);
    }

    return {
        alert, 
        setAlert, 
        showAlert,
        getShowAlert,
        setShowAlert
    }
}