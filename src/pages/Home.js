import '../App.css';
import AppNavbar from '../components/AppNavbar/AppNavbar';
import QuestionsModeSelection from "./QuestionsModeSelection/ModeSelection";

const Home = () => {

    return (
        <div>
            <AppNavbar/>
            <QuestionsModeSelection/>
        </div>
    );
};

export default Home;