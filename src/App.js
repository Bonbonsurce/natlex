import './styles/App.css';
import Header from "./components/UI/header/Header";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";

function App() {
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
