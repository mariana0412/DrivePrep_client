import '../App.css';
import AppNavbar from '../components/AppNavbar/AppNavbar';
import QuestionsModeSelection from "./QuestionsModeSelection/ModeSelection";

// Home page - renders navbar and questions mode selection
const Home = () => {

    return (
        <div>
            <AppNavbar/>
            <QuestionsModeSelection/>
        </div>
    );
};

export default Home;