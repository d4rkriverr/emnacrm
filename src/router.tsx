import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import DefaultLayout from "./components/default_layout";
import MainLayout from "./modules/MainLayout";

import Authentication from "./modules/Authentication";
import Workspace from "./modules/Workspaces";
import { AuthProvider } from "./hooks/useAuth";
import WorkspaceLayout from "./components/workspace_layout";
import CallCenter from "./modules/CallCenter";



export const router = () => {

    const app = (
        <Route element={<AuthProvider />}>
            <Route path="/" element={<DefaultLayout child={<Authentication />} />} />
            <Route path="/dashboard" element={<MainLayout />}>
                <Route path="overview" element={<Workspace />} />
                <Route path="employees" element={<Workspace />} />
                <Route path="expenses" element={<Workspace />} />
                <Route path="call-center" element={<CallCenter />} />

                <Route path="workspaces" element={<WorkspaceLayout />}>
                    <Route path=":id" element={<Workspace />} />
                </Route>
            </Route>
        </Route>
    )
    return createBrowserRouter(createRoutesFromElements(app))
} 