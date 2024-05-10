import { createContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export default SettingsContext;

export const SettingsProvider = ({children}) => {

    const [isSettings, setIsSettings] = useState(null)

    let contextData = {
        isSettings: isSettings,
        setIsSettings:setIsSettings
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}