import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Header/Header";
import AddEmployees from './pages/AddEmployees/AddEmployees';
import ListEmployees from "./pages/listEmployees/listEmployees";
import Error from "./pages/Error/Error";

import "./App.css";

function App() {
    return (
        <div className="mainContainer">
            <NavBar />
            <div className="app">
                <Routes>
                    <Route path="/" element={<AddEmployees />} />
                    <Route path="/Home" element={<AddEmployees />} />
                    <Route path="/listemployees" element={<ListEmployees />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
