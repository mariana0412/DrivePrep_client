import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import ModeSelection from "./components/ModeSelection/ModeSelection";
import Training from "./components/Mode/Training";
import AuthorizationPage from './components/Authorization/AuthorizationPage';
import Exam from "./components/Mode/Exam";
import EditPage from "./components/pages/EditPage";
import Region from "./components/pages/Region";
import SignPage from "./components/Card/SignPage";
import Laws from "./components/Laws/Laws";
import TipsPage from "./components/pages/TipsPage";
import Fines from "./components/Fines/Fines";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/tests" element={<Home/>}></Route>
                <Route exact path="/profile" element={<EditPage id={"user1"}/>}></Route>
                <Route exact path="/questions-choice" element={<ModeSelection/>}></Route>
                <Route exact path="/training" element={<Training/>}></Route>
                <Route exact path="/authorization" element={<AuthorizationPage/>}></Route>
                <Route exact path="/exam" element={<Exam/>}></Route>
                <Route exact path="/number-identifier" element={<Region/>}></Route>
                <Route exact path="/signs" element={<SignPage/>}></Route>
                <Route exact path="/laws" element={<Laws/>}></Route>
                <Route exact path="/study-materials" element={<TipsPage/>}></Route>
                <Route exact path="/fines" element={<Fines/>}></Route>
            </Routes>
        </Router>

  );
}

export default App;
