import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {SettingsContext} from "../../../context/context";

const Header = () => {
    const {isSettings, setIsSettings} = useContext(SettingsContext);

    const viewModeClick = (event) => {
        setIsSettings(false);
    };

    const settingsClick = (event) => {
        setIsSettings(true);
    };

    return (
        <div className='navbar'>
            <Link className='nav__link' to="/view-mode"  onClick={viewModeClick}>View mode</Link>
            <Link className='nav__link' to="/settings" onClick={settingsClick}>Settings</Link>
        </div>
    );
};

export default Header;