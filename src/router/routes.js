import Charts from "../pages/Charts";
import Settings from "../pages/Settings";
import {Navigate} from "react-router-dom";

export const publicRoutes = [
    {path: '/view-mode', element: <Charts/>},
    {path: '/settings', element: <Settings/>},
    {path: '*', element: <Navigate to='/view-mode'/>}
];