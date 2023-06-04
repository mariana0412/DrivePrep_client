import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import QuestionsChoice from "./components/QuestionsChoice/QuestionsChoice";
import Questions from "./components/Questions/Questions";
import Laws from "./components/Laws/Laws";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/questions-choice" element={<QuestionsChoice/>}></Route>
                <Route exact path="/questions" element={<Questions/>}></Route>
                <Route exact path="/laws" element={<Laws/>}></Route>
            </Routes>
        </Router>

  );
}

export default App;
