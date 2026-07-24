import { useState } from "react";
import { AuthContext } from "./AuthContext";

interface Props {
    children: React.ReactNode;
}

export default function AuthProvider({
    children,
}: Props) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    function login(jwt: string) {

        localStorage.setItem("token", jwt);

        setToken(jwt);
    }

    function logout() {

        localStorage.removeItem("token");

        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}