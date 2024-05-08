import React from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "../../router/routes";

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(route=>
                <Route
                    element={route.element}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
        </Routes>
    );
};

export default AppRouter;