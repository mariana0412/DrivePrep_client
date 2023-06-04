import React, { useEffect, useState } from "react";
import "./Questions.css";
import AppNavbar from "../AppNavbar/AppNavbar";
import MyButton from "../UI/button/MyButton";
import HintModal from "./HintModal";
import QuestionService from "../../services/QuestionService";
import Variants from "./Variants";

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [selectedOption, setSelectedOption] = useState("");
    const [timer, setTimer] = useState(10); // 20 minutes in seconds
    const [showModal, setShowModal] = useState(false);

    const searchParams = new URLSearchParams(window.location.search);
    const complexity = searchParams.get("complexity");
    const category = searchParams.get("category");

    const [isFinished, setIsFinished] = useState(false);
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const [finishExamText, setFinishExamText] = useState("");

    const [isHintModalOpen, setIsHintModalOpen] = useState(false);
    const [hint, setHint] = useState("");


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
        const interval = setInterval(() => {
            if (isTimerRunning) {
                setTimer(prevTimer => prevTimer - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimerRunning]);

    useEffect(() => {
        if (timer <= 0 && !isTimerFinished) {
            setIsTimerFinished(true);
            setIsFinished(true);
            setFinishExamText("Час вичерпався.")
            setShowModal(true);
        }
    }, [timer, isTimerFinished]);

    const handleQuestionClick = (index) => {
        setSelectedOption("");
        setCurrentQuestionIndex(index);
    };

    const handleNextQuestionClick = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }

        if (timer <= 0) {
            setShowModal(true);
        }
    };

    const checkAnswer = (item) => {
        if (isFinished)
            return;
        if(timer <= 0)
            return;
        const isCorrect = item === currentQuestion.answer;
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
                        ${isFinished && question.answer === selectedAnswers[index] ? "correct" : ""}
                        ${isFinished && !(question.answer === selectedAnswers[index]) ? "incorrect" : ""}
                        ${isFinished && question.answer === selectedAnswers[index] === undefined ? "unanswered" : ""}
                `}
                        onClick={() => handleQuestionClick(index)}
                    >
                        {index + 1}
                    </div>
                ))}
            </>
        );
    };


    const formatTimer = (seconds) => {
        if (seconds <= 0)
            return "0:00";

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const handleFinishButtonClick = () => {
        setIsFinished(true);
        setIsTimerRunning(false);
        setShowModal(true);
    }
    const openModal = (explanation) => {
        setIsHintModalOpen(true);
        setHint(explanation);
    };

    const closeModal = () => {
        setIsHintModalOpen(false);
        setHint("");
    };

    return (
        <div>
            <AppNavbar />
            <div className="question-numbers">
                {renderPagination()}
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

                            <Variants
                                currentQuestion={currentQuestion}
                                selectedOption={selectedOption}
                                currentQuestionIndex={currentQuestionIndex}
                                checkAnswer={checkAnswer}
                                examMode={true}
                                examFinished={isFinished}
                                selectedAnswers={selectedAnswers}
                            />

                            <div>
                                {
                                    !isFinished
                                        ?
                                    <MyButton
                                        onClick={handleFinishButtonClick}>
                                        Завершити
                                    </MyButton>
                                        :
                                    <MyButton isWhite
                                              onClick={() => openModal(currentQuestion.tips)}>
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
                        </form>
                    )}
                </div>
                <div className="childDiv timer">
                    <h2>Залишилося: {formatTimer(timer)} </h2>
                    {
                        showModal
                        &&
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Кінець!</h2>
                                <p>{finishExamText}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <HintModal
                isOpen={isHintModalOpen}
                closeModal={closeModal}
                hint={hint}
            />
        </div>
    );
};

export default Exam;
