import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className='navbar'>
            <Link className='nav__link' to="/view-mode">View mode</Link>
            <Link className='nav__link' to="/settings">Settings</Link>
        </div>
    );
};

export default Header;