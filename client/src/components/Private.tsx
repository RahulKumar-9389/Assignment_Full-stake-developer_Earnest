import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authProvider";
import { Outlet } from 'react-router-dom'
import Login from "../pages/Login";


export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth]: any = useAuth();


    useEffect(() => {
        const authCheck = async () => {
            const { data } = await axios.get("https://taskmanagerserver-xq5h.onrender.com/api/v1/auth/user-auth");

            if (data === 'ok') {
                setOk(true);
            } else {
                setOk(false);
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Login />
}