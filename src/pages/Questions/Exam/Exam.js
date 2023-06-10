import React, { useEffect, useState } from "react";
import "../QuestionsPage.css";
import AppNavbar from "../../../components/AppNavbar/AppNavbar";
import MyButton from "../../../components/UI/button/MyButton";
import QuestionService from "../../../services/QuestionService";
import Variants from "../Variants";
import {FaSave} from "react-icons/fa";
import {handleSaveQuestion} from "../../../utils/handleSaveQuestion";
import {formatTimer} from "../../../utils/formatTimer";
import {calculateExamScore} from "../../../utils/calculateExamScore";

export const EXAM_TIME = 20 * 60;   // 20 minutes in seconds

const Exam = () => {

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [selectedOption, setSelectedOption] = useState("");
    const [answersCorrect, setAnswersCorrect] = useState({});

    const [showModal, setShowModal] = useState(false);

    const searchParams = new URLSearchParams(window.location.search);
    const complexity = searchParams.get("complexity");
    const category = searchParams.get("category");

    const [isFinished, setIsFinished] = useState(false);
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const [timer, setTimer] = useState(EXAM_TIME);
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const [finishExamText, setFinishExamText] = useState("");
    const [showHint, setShowHint] = useState(false);

    const [score, setScore] = useState(0);

    const [isSaved, setIsSaved] = useState(!!currentQuestion?.saved);
    const [saveButtonClass, setSaveButtonClass] = useState(`save-button ${!!currentQuestion?.saved ? 'saved' : ''}`);

    useEffect(() => {
        let url = `/exam-questions`;
        url += `?categoryId=${category}`;

        if (complexity)
            url += `&complexityLevel=${complexity}`;

        fetch(url)
            .then((response) => {
                if (response.status === 204) return [];
                else return response.json();
            })
            .then((data) => {
                setQuestions(data);
            })
            .catch((error) => {
                console.error("Error:", error);
                setQuestions([]);
            });
    }, [category, complexity]);

    useEffect(() => {
        const storedTimer = localStorage.getItem("timer");
        if (storedTimer) {
            const storedTimerValue = parseInt(storedTimer, 10);
            setTimer(storedTimerValue);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isTimerRunning) {
                setTimer((prevTimer) => {
                    const newTimer = prevTimer - 1;
                    localStorage.setItem("timer", newTimer.toString());
                    return newTimer;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimerRunning]);

    useEffect(() => {
        if (timer <= 0 && !isTimerFinished) {
            setIsTimerFinished(true);
            setIsFinished(true);
            setFinishExamText("Час вичерпався.")
            setScore(calculateExamScore(answersCorrect));
            setShowModal(true);
        }
    }, [timer, isTimerFinished, answersCorrect]);

    useEffect(() => {
        setIsSaved(!!questions[currentQuestionIndex]?.saved);
    }, [currentQuestionIndex, questions]);

    useEffect(() => {
        setSaveButtonClass(`save-button ${isSaved ? 'saved' : ''}`);
    }, [isSaved]);

    const handleQuestionClick = (index) => {
        setSelectedOption("");
        setCurrentQuestionIndex(index);
        setIsSaved(!!questions[index]?.saved)
        setShowHint(false);
    };

    const handleNextQuestionClick = () => {
        const newIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(newIndex);
        setIsSaved(!!questions[newIndex]?.saved)
        setShowHint(false);
    };

    const checkAnswer = (item) => {
        if (isFinished)
            return;
        if(timer <= 0)
            return;
        const isCorrect = item === currentQuestion.answer;
        setAnswersCorrect({
            ...answersCorrect,
            [currentQuestionIndex]: isCorrect,
        });
        setSelectedOption(item);

        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestionIndex]: item,
        });

        const userId = localStorage.getItem("userId");

        if (userId) {
            QuestionService.saveSolvedQuestion(userId, currentQuestion.id, isCorrect)
                .catch((error) => console.error('Error:', error));
        }
    };

    const renderPagination = () => {
        return (
            <>
                {questions.map((question, index) => (
                    <div
                        key={question.id}
                        className={`question-number 
                        ${index === currentQuestionIndex ? "active" : ""}
                         ${isFinished && answersCorrect[index] ? "correct" : ""}
                        ${isFinished && answersCorrect[index] === false ? "incorrect" : ""}
                        ${isFinished && answersCorrect[index] === undefined ? "unanswered" : ""}
                `}
                        onClick={() => handleQuestionClick(index)}
                    >
                        {index + 1}
                    </div>
                ))}
            </>
        );
    };

    const handleFinishButtonClick = () => {
        setIsFinished(true);
        setIsTimerRunning(false);
        setScore(calculateExamScore(answersCorrect));
        setShowModal(true);
    }

    const handleSaveQuestionClick = () => handleSaveQuestion(isSaved, currentQuestion, questions, setQuestions, setIsSaved);

    return (
        <div>
            <AppNavbar />
            <div className="question-numbers">
                {renderPagination()}
            </div>

            <div className="parentDiv">
                <div className="childDiv question">
                    { localStorage.getItem("token")
                        &&
                        <button className={saveButtonClass} onClick={handleSaveQuestionClick}>
                            <FaSave/>
                        </button>
                    }
                    {currentQuestion && (
                        <form className="question-container">
                            <div>
                                <div style={{height: '50px'}}>
                                    <h3>{currentQuestion.text}</h3>
                                </div>
                                <div className="question-content">
                                    <div className={`question-first-column ${!currentQuestion.picturePath ? 'no-image' : ''}`}>
                                        <Variants
                                            currentQuestion={currentQuestion}
                                            selectedOption={selectedOption}
                                            currentQuestionIndex={currentQuestionIndex}
                                            checkAnswer={checkAnswer}
                                            examMode={true}
                                            examFinished={isFinished}
                                            selectedAnswers={selectedAnswers}
                                        />
                                    </div>

                                        <div className="question-second-column">
                                            <div className="question-image-container">
                                                { currentQuestion.picturePath &&
                                                    <img
                                                        src={process.env.PUBLIC_URL + `/question/${currentQuestion.picturePath}`}
                                                        alt="Question Illustration"
                                                        className="question-image"
                                                    />
                                                }
                                            </div>
                                        </div>
                                </div>

                                <div className="question-content">
                                    <div className='question-first-column'>
                                        {
                                            showHint
                                            &&
                                            <div className="question-hint"> {currentQuestion.tips} </div>
                                        }
                                    </div>
                                    <div className='question-second-column'>
                                        {
                                            !isFinished
                                                ?
                                                <MyButton
                                                    onClick={handleFinishButtonClick}>
                                                    Завершити
                                                </MyButton>
                                                :
                                                <MyButton isWhite
                                                          onClick={() => setShowHint(true)}>
                                                    Пояснення
                                                </MyButton>
                                        }
                                        {
                                            currentQuestionIndex < questions.length - 1
                                            &&
                                            <MyButton isWhite onClick={handleNextQuestionClick}>
                                                Наступне
                                            </MyButton>
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
                <div className="childDiv">
                    <div className="timer">
                        <h1>{formatTimer(timer)}</h1>
                    </div>
                    {
                        showModal
                        &&
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Кінець! {score}/20</h2>
                                <p>{finishExamText}</p>
                                {score >= 18 ? `Вітаємо! Ви склали іспит!` : `На жаль, Ви  не склали іспит...`}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Exam;
