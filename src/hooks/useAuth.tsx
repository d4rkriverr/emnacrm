import { createContext, useContext, useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";


interface UserHookModel {
    isAuthed: boolean;
    userLogin: (username: string, password: string) => Promise<unknown>;
    userLogout: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<UserHookModel>({} as any);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = () => {
    const navigate = useNavigate();
    const outlet = useOutlet();

    const [isAuthed, setIsAuthed] = useState(false);
    const [user, setUser] = useState(null);

    const userLogin = async (username: string, password: string) => {
        return new Promise((r) => {

            JSON.stringify({ username, password })
            setTimeout(() => {
                setIsAuthed(true)
                navigate("/dashboard/overview", { replace: true });
                r(user)
            }, 2000);
        })
    };

    const userLogout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    return <AuthContext.Provider value={
        {
            isAuthed,
            userLogin,
            userLogout
        }
    }>{outlet}</AuthContext.Provider>;
};

