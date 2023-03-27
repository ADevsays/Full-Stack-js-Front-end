import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/Spinner";


function ProtectedRoute() {
    const {auth, load} = useAuth();


    if(load) return <Spinner/>
    return (
        <>
        <Header/>
            {auth?._id ? <Outlet/> : <Navigate to="/"/>}
        <Footer/>
        
        </>
    );
}

export default ProtectedRoute;