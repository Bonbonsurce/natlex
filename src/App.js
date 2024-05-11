import './styles/App.css';
import Header from "./components/UI/header/Header";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";
import {useEffect, useState} from "react";
import {SettingsContext} from "./context/context";
import ChartsService from "./API/ChartsService";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSettings, setIsSettings] = useState(false);
    const [chartsStat, setChartsStat] = useState([]);

    //const chartsStat = ChartsService.generateCharts(10);

    useEffect(() => {
        const generatedChartsStat = ChartsService.generateCharts(10);
        setChartsStat(generatedChartsStat);

        if (localStorage.getItem('settings')) {
            setIsSettings(true);
        }
        setIsLoading(false);
    }, []);

    return (
        <SettingsContext.Provider value={{
            isSettings,
            setIsSettings: setIsSettings,
            setIsLoading: setIsLoading,
            chartsStat,
            setChartsStat: setChartsStat
        }}
        >
            <div className="App">
                <BrowserRouter>
                    <Header/>
                    <AppRouter/>
                </BrowserRouter>
            </div>
        </SettingsContext.Provider>

    );
}

export default App;
