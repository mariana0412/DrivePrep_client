import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import QuestionsChoice from "./components/QuestionsChoice/QuestionsChoice";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/questions-choice" element={<QuestionsChoice/>}></Route>
            </Routes>
        </Router>

  );
}

export default App;
