import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import ModeSelection from "./pages/QuestionsModeSelection/ModeSelection";
import Training from "./pages/Questions/TrainingByThemes/Training";
import AuthorizationPage from './pages/Authorization/AuthorizationPage';
import Exam from "./pages/Questions/Exam/Exam";
import EditPage from "./pages/UserProfile/EditPage";
import Region from "./pages/RegionIdentifier/Region";
import SignPage from "./pages/RoadSigns/SignPage";
import Laws from "./pages/Laws/Laws";
import TipsPage from "./pages/Tips/TipsPage";
import Fines from "./pages/Fines/Fines";
import BACCalculator from "./pages/Alcotester/BACCalculator";
import Rules from "./pages/Rules/Rules";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/tests" element={<Home/>}></Route>
                <Route exact path="/profile" element={<EditPage/>}></Route>
                <Route exact path="/questions-choice" element={<ModeSelection/>}></Route>
                <Route exact path="/training" element={<Training/>}></Route>
                <Route exact path="/authorization" element={<AuthorizationPage/>}></Route>
                <Route exact path="/exam" element={<Exam/>}></Route>
                <Route exact path="/region-identifier" element={<Region/>}></Route>
                <Route exact path="/signs" element={<SignPage/>}></Route>
                <Route exact path="/laws" element={<Laws/>}></Route>
                <Route exact path="/study-materials" element={<TipsPage/>}></Route>
                <Route exact path="/alcotester" element={<BACCalculator/>}></Route>
                <Route exact path="/fines" element={<Fines/>}></Route>
                <Route exact path="/rules" element={<Rules/>}></Route>
            </Routes>
        </Router>

  );
}

export default App;
