import { createContext, useContext, useEffect, useState } from "react";
import { useOutlet } from "react-router-dom";
import { configs } from "../constants";


interface UserAccount {
    username: string;
}
interface UserHookModel {
    isAuthed: boolean;
    user: UserAccount | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userLogin: (username: string, password: string) => Promise<any>;
    userLogout: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<UserHookModel>({} as any);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = () => {
    const outlet = useOutlet();

    const [isAuthed, setIsAuthed] = useState(false);
    const [isLoad, setIsLoad] = useState(true);

    const [user, setUser] = useState<UserAccount | null>(null);

    useEffect(() => { userInfo() }, [])

    const userInfo = async () => {
        const endpoint = 'http://emnaservices.online/api/v2/account/info';
        const token = localStorage.getItem(configs.TOKEN_NAME);
        if (token == "" || token == null) return setIsLoad(false)

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });

            const resp = await response.json();
            if (!resp.success) return setIsLoad(false)
            setIsAuthed(true);
            setIsLoad(false)
            setUser({ username: resp.payload.username })
        } catch (e) {
            setIsLoad(false)
            return e
        }
    }

    const userLogin = async (username: string, password: string) => {
        const endpoint = 'http://emnaservices.online/api/v2/account/auth';
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) return await response.json();
            const data = await response.json();
            localStorage.setItem(configs.TOKEN_NAME, data.payload);
            setIsAuthed(true);
            window.location.assign("/")
            return { success: true }
        } catch (e) {
            return { success: false, message: 'Error during authentication', e };
        }
    };

    const userLogout = () => {
        setUser(null);
        localStorage.removeItem(configs.TOKEN_NAME);
        window.location.assign("/");
    };

    return <AuthContext.Provider value={
        {
            isAuthed,
            user,
            userLogin,
            userLogout
        }
    }>
        {isLoad ? <>Loading....</> : <>{outlet}</>}
    </AuthContext.Provider>;
};

