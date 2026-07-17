import { Navigate } from "react-router-dom";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {

    const { token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
    
}