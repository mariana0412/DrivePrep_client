import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import ModeSelection from "./components/ModeSelection/ModeSelection";
import Training from "./components/Mode/Training";
import AuthorizationPage from './components/Authorization/AuthorizationPage';
import Exam from "./components/Mode/Exam";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/questions-choice" element={<ModeSelection/>}></Route>
                <Route exact path="/training" element={<Training/>}></Route>
                <Route exact path="/authorization" element={<AuthorizationPage/>}></Route>
                <Route exact path="/exam" element={<Exam/>}></Route>
            </Routes>
        </Router>

  );
}

export default App;
