import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function DefaultLayout({ child }: { child: JSX.Element }) {
    const { isAuthed } = useAuth();
    if (isAuthed) return <Navigate to="/dashboard/overview" />;
    return child
}