import './styles/App.css';
import Header from "./components/UI/header/Header";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";
import {useEffect, useState} from "react";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <div className="App">
          <BrowserRouter>
              <Header/>
              <AppRouter/>
          </BrowserRouter>
        </div>
    );
}

export default App;
