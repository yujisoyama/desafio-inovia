import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { useCliente } from "../context/ClienteContext";
import { LoginHeader } from "./LoginHeader";
import { Loading } from "./Loading";

export const PrivateRoutes = () => {
    const { token, authenticated, getProfile } = useCliente();
    let timer: number;
    useEffect(() => {
        timer = setTimeout(() => getProfile(token), 2000);
    }, [authenticated])

    if (authenticated === undefined) {
        return (
            <div className="bg-backgroundLight bg-cover bg-no-repeat w-screen h-screen overflow-y-auto flex flex-col justify-between mobile:bg-loginBackgroundMobile">
                <LoginHeader />
                <Loading />
                <Footer />
            </div>
        )
    }

    return authenticated ? <Outlet /> : <Navigate to="/login" />
}
