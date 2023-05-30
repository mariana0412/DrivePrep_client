import { useEffect, useState } from "react";
import "./Questions.css";
import AppNavbar from "../AppNavbar/AppNavbar";
import MyButton from "../UI/button/MyButton";
import {Form, FormGroup, Input, Label} from "reactstrap";
import ThemesList from "./ThemesList";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [selectedOption, setSelectedOption] = useState("");
    const [answersCorrect, setAnswersCorrect] = useState({});
    const questionsPerPage = 21;
    const [currentPage, setCurrentPage] = useState(0);
    const [showPrevArrow, setShowPrevArrow] = useState(false);
    const [showNextArrow, setShowNextArrow] = useState(true);
    const [selectedThemeId, setSelectedThemeId] = useState('all');

    useEffect(() => {
        /*TODO: fetch question according to chosen complexity if it was chosen*/
        let url = `/questions`;
        if(selectedThemeId !== 'all')
            url += `?themeId=${selectedThemeId}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => setQuestions(data));
    }, [selectedThemeId]);

    const handleQuestionClick = (index) => {
        setSelectedOption("");
        setCurrentQuestionIndex(currentPage * questionsPerPage + index);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            checkAnswer();
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        /* TODO: handle case when this question is the last in the theme. maybe, don't show button 'Next' then
        *  TODO: or refer to 1st question of the next theme */
    };

    const handleThemeClick = (themeId) => {
        setSelectedThemeId(themeId);
        setCurrentQuestionIndex(0);
        setCurrentPage(0);
    };

    const checkAnswer = () => {
        const isCorrect = selectedOption === currentQuestion.answer;
        setAnswersCorrect({
            ...answersCorrect,
            [currentQuestionIndex]: isCorrect,
        });
    };

    const handleOptionChange = (event) => setSelectedOption(event.target.value);

    const goToPreviousPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < Math.ceil(questions.length / questionsPerPage) - 1)
            setCurrentPage(currentPage + 1);
    };

    const renderQuestions = () => {
        const startIndex = currentPage * questionsPerPage;
        const endIndex = startIndex + questionsPerPage;
        const pageQuestions = questions.slice(startIndex, endIndex);

        return (
            <>
                {showPrevArrow && (
                    <button className="arrow prev-arrow" onClick={goToPreviousPage}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                )}
                {pageQuestions.map((question, index) => (
                    <div
                        key={question.id}
                        className={
                        `question-number 
                        ${startIndex + index === currentQuestionIndex ? "active" : ""}
                        ${answersCorrect[startIndex + index] ? "correct" : ""}
                        ${answersCorrect[startIndex + index] === false ? "incorrect" : ""}`}
                        onClick={() => handleQuestionClick(index)}
                    >
                        {startIndex + index + 1}
                    </div>
                ))}
                {showNextArrow && (
                    <button className="arrow next-arrow" onClick={goToNextPage}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                )}
            </>
        );
    };

    useEffect(() => {
        if (questions.length <= questionsPerPage) {
            setShowPrevArrow(false);
            setShowNextArrow(false);
        } else {
            setShowPrevArrow(currentPage > 0);
            setShowNextArrow(currentPage < Math.ceil(questions.length / questionsPerPage) - 1);
        }
    }, [currentPage, questions.length]);

    return (
        <div>
            <AppNavbar />
            <div className="question-numbers">
                {renderQuestions()}
            </div>

            <div className="parentDiv">
                <div className="childDiv question">
                    {currentQuestion && (
                        <Form className="question-container">
                            <div className="question-content">
                                <h3>{currentQuestion.text}</h3>
                                {/*TODO: think about how to display images*/}
                                {currentQuestion.picturePath && (
                                    <img
                                        src={currentQuestion.picturePath}
                                        alt="Question Image"
                                        className="question-image"
                                    />
                                )}
                            </div>
                            <FormGroup>
                                <Input type="radio" id="var1" name="answer"
                                    value={currentQuestion.var1}
                                    checked={selectedOption === currentQuestion.var1}
                                    onChange={handleOptionChange}
                                />
                                <Label for="var1">{currentQuestion.var1}</Label>
                            </FormGroup>

                            <FormGroup>
                                <Input type="radio" id="var2" name="answer"
                                    value={currentQuestion.var2}
                                    checked={selectedOption === currentQuestion.var2}
                                    onChange={handleOptionChange}
                                />
                                <Label for="var2">{currentQuestion.var2}</Label>
                            </FormGroup>

                            <FormGroup>
                                <Input type="radio" id="var3" name="answer"
                                    value={currentQuestion.var3}
                                    checked={selectedOption === currentQuestion.var3}
                                    onChange={handleOptionChange}
                                />
                                <Label for="var3">{currentQuestion.var3}</Label>
                            </FormGroup>

                            <div>
                                <MyButton isWhite> Пояснення </MyButton>
                                <MyButton onClick={handleNextQuestion}> Наступне </MyButton>
                            </div>
                        </Form>
                    )}
                </div>
                <div className="childDiv">
                    <ThemesList
                        selectedThemeId={selectedThemeId}
                        onThemeClick={handleThemeClick}
                    />
                </div>
            </div>

        </div>
    );
};

export default Questions;
