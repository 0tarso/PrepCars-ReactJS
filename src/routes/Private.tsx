//React
import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";

//Context
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/spinner";

interface PrivateProps {
    children: ReactNode
}


export function Private({ children }: PrivateProps): any {
    const { signed, loadingAuth } = useContext(AuthContext);

    if (loadingAuth) {
        return (
            <Spinner />
        )
    }

    if (!signed) {
        return <Navigate to="/login" />
    }

    return children
}