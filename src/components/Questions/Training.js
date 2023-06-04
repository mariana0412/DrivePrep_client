import React, {useEffect, useState} from "react";
import "./Questions.css";
import AppNavbar from "../AppNavbar/AppNavbar";
import MyButton from "../UI/button/MyButton";
import ThemesList from "./ThemesList";
import HintModal from "./HintModal";
import {FaSave} from "react-icons/fa";
import QuestionService from '../../services/QuestionService';
import Variants from "./Variants";

const Training = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [selectedOption, setSelectedOption] = useState("");
    const questionsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(0);
    const [showPrevArrow, setShowPrevArrow] = useState(false);
    const [showNextArrow, setShowNextArrow] = useState(true);
    const [selectedThemeId, setSelectedThemeId] = useState("all");
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    const searchParams = new URLSearchParams(window.location.search);
    const complexity = searchParams.get("complexity");
    const category = searchParams.get("category");

    const [showEmpty, setShowEmpty] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hint, setHint] = useState("");

    const [isNewQuestionsChecked, setIsNewQuestionsChecked] = useState(false);
    const [isSaved, setIsSaved] = useState(!!currentQuestion?.saved);

    useEffect(() => {
        let url = `/questions`;

        if(selectedThemeId !== 'all')
            url += `?themeId=${selectedThemeId}`;
        else if(category)
            url += `?categoryId=${category}`

        if(complexity)
            url += `&complexityLevel=${complexity}`;

        if(isNewQuestionsChecked) {
            const formattedDate = '2023-01-01';
            url += `&dateAdded=${formattedDate}`;
        }

        const userId = localStorage.getItem("userId");
        if(userId)
            url += `&userId=${userId}`;

        fetch(url)
            .then((response) => {
                if (response.status === 204)
                    return [];
                else
                    return response.json();
            })
            .then((data) => {
                setQuestions(data);
                setShowEmpty(data.length === 0);
            })
            .catch((error) => {
                console.error('Error:', error);
                setQuestions([]);
                setShowEmpty(true);
            });
    }, [category, complexity, isNewQuestionsChecked, selectedThemeId]);

    const handleQuestionClick = (index) => {
        setIsAnswerChecked(false);
        setSelectedOption("");
        setCurrentQuestionIndex(currentPage * questionsPerPage + index);
        setIsSaved(!!questions[currentPage * questionsPerPage + index]?.saved)
    };

    const handleNextQuestionClick = () => {
        if (currentQuestionIndex < questions.length - 1)
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswerChecked(false);
        setIsSaved(!!questions[currentQuestionIndex + 1]?.saved);
    };

    const handleThemeClick = (themeId) => {
        setSelectedThemeId(themeId);
        setCurrentQuestionIndex(0);
        setCurrentPage(0);
        setIsAnswerChecked(false);
        setSelectedOption("");
    };

    const checkAnswer = (item) => {
        if(isAnswerChecked)
            return;
        const isCorrect = item === currentQuestion.answer;
        setIsAnswerChecked(true);
        setSelectedOption(item);

        const userId = localStorage.getItem("userId");

        if (userId) {
            const questionId = currentQuestion.id;
            QuestionService.saveSolvedQuestion(userId, questionId, isCorrect)
                .catch((error) => console.error('Error:', error));
        }
    };

    const renderPagination = () => {
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
                        ${startIndex + index === currentQuestionIndex ? "active" : ""}
                        ${selectedOption === currentQuestion.answer ? "correct" : ""}
                        ${!(selectedOption === currentQuestion.answer) ? "incorrect" : ""}
                        
                        ${localStorage.getItem('token')
                        && question.solved === true ? "correct" :
                            question.solved === false ? "incorrect" : ""}
                        `}

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

    const openModal = (explanation) => {
        setIsModalOpen(true);
        setHint(explanation);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setHint("");
    };

    const handleNewQuestionsChange = () => setIsNewQuestionsChecked(!isNewQuestionsChecked);

    const handleSaveQuestion = async () => {
        const userId = localStorage.getItem("userId");
        const questionId = currentQuestion.id;

        try {
            if (!isSaved)
                await QuestionService.saveSavedQuestion(userId, questionId);
            else
                await QuestionService.deleteSavedQuestion(userId, questionId);
            setIsSaved(!isSaved);
        } catch (error) {
            console.error("Error:", error);
        }
        setIsSaved(!isSaved);
    }

    return (
        <div>
            <AppNavbar />
            <div className="question-numbers">
                {renderPagination()}
            </div>

            <div className="parentDiv">
                { showEmpty
                    ?
                    <div className="text-center">
                        <div className="content">Таких питань нема.</div>
                    </div>
                    :
                    <div className="childDiv question">
                        { localStorage.getItem("token")
                            &&
                            <button className={`save-button ${isSaved ? 'saved' : ''}`} onClick={handleSaveQuestion}>
                                <FaSave/>
                            </button>
                        }
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
                                    examMode={false}
                                />

                                <div>
                                    <MyButton isWhite onClick={() => openModal(currentQuestion.tips)}> Пояснення </MyButton>
                                    {
                                        currentQuestionIndex < (questions.length - 1) &&
                                        <MyButton onClick={handleNextQuestionClick}> Наступне </MyButton>
                                    }
                                </div>
                            </form>
                        )}
                    </div>
                }
                <div className="childDiv themes">
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            checked={isNewQuestionsChecked}
                            onChange={handleNewQuestionsChange}
                        />
                        <label htmlFor="newQuestions">Нові питання 2023 року</label>
                    </div>
                    <br></br>
                    <ThemesList
                        categoryId={category}
                        selectedThemeId={selectedThemeId}
                        onThemeClick={handleThemeClick}
                    />
                </div>
            </div>

            <HintModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                hint={hint}
            />
        </div>
    );
};

export default Training;