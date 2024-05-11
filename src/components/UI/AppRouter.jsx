import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "../../router/routes";
import {SettingsContext} from "../../context/context";

const AppRouter = () => {
    const {isSettings, setIsSettings, setIsLoading, chartsStat} = useContext(SettingsContext);

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