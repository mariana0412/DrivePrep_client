import { useEffect, useState } from "react";
import "./Questions.css";
import AppNavbar from "../AppNavbar/AppNavbar";
import MyButton from "../UI/button/MyButton";
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
    const [selectedThemeId, setSelectedThemeId] = useState("all");
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    useEffect(() => {
        /*TODO: fetch question according to chosen complexity if it was chosen*/
        let url = `/questions`;
        if (selectedThemeId !== "all") url += `?themeId=${selectedThemeId}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => setQuestions(data));
    }, [selectedThemeId]);

    const handleQuestionClick = (index) => {
        setIsAnswerChecked(false);
        setSelectedOption("");
        setCurrentQuestionIndex(currentPage * questionsPerPage + index);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1)
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswerChecked(false);
    };

    const handleThemeClick = (themeId) => {
        setSelectedThemeId(themeId);
        setCurrentQuestionIndex(0);
        setCurrentPage(0);
        setAnswersCorrect({});
    };

    const checkAnswer = (item) => {
        if(isAnswerChecked)
            return;
        const isCorrect = item === currentQuestion.answer;
        setAnswersCorrect({
            ...answersCorrect,
            [currentQuestionIndex]: isCorrect,
        });
        setIsAnswerChecked(true);
        setSelectedOption(item);
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
                        className={`question-number 
                        ${
                            startIndex + index === currentQuestionIndex
                                ? "active"
                                : ""
                        }
                        ${answersCorrect[startIndex + index] ? "correct" : ""}
                        ${
                            answersCorrect[startIndex + index] === false
                                ? "incorrect"
                                : ""
                        }`}
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

    const goToPreviousPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < Math.ceil(questions.length / questionsPerPage) - 1)
            setCurrentPage(currentPage + 1);
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

    const variants = () =>  [currentQuestion.var1, currentQuestion.var2, currentQuestion.var3];

    const renderVariants = () => {
        return variants().map((item) => {
            const variantClass = `variant answer-label ${
                selectedOption === item && answersCorrect[currentQuestionIndex]
                    ? 'correct'
                    : selectedOption === item && answersCorrect[currentQuestionIndex] === false
                        ? 'incorrect'
                        : ''
            }`;

            return (
                <li
                    key={item}
                    className={variantClass}
                    onClick={() => checkAnswer(item)}
                >
                    {item}
                </li>
            );
        });
    };

    return (
        <div>
            <AppNavbar />
            <div className="question-numbers">
                {renderQuestions()}
            </div>

            <div className="parentDiv">
                <div className="childDiv question">
                    {currentQuestion && (
                        <form className="question-container">
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

                            <ul className="variants">
                                {renderVariants()}
                            </ul>

                            <div>
                                <MyButton isWhite> Пояснення </MyButton>
                                {
                                    currentQuestionIndex < (questions.length - 1) &&
                                    <MyButton onClick={handleNextQuestion}> Наступне </MyButton>
                                }
                            </div>
                        </form>
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
