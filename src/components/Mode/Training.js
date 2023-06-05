import React, {useEffect, useState} from "react";
import "./Questions.css";
import AppNavbar from "../AppNavbar/AppNavbar";
import MyButton from "../UI/button/MyButton";
import ThemesList from "./ThemesList";
import {FaSave} from "react-icons/fa";
import QuestionService from '../../services/QuestionService';
import Variants from "./Variants";

const Training = () => {

    const QUESTIONS_PER_PAGE = 20;
    const NEW_QUESTIONS_START_DATE = '2023-01-01';

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [selectedOption, setSelectedOption] = useState("");
    const [answersCorrect, setAnswersCorrect] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [showPrevArrow, setShowPrevArrow] = useState(false);
    const [showNextArrow, setShowNextArrow] = useState(true);
    const [selectedThemeId, setSelectedThemeId] = useState("all");
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    const searchParams = new URLSearchParams(window.location.search);
    const mode = searchParams.get("mode");
    const complexity = searchParams.get("complexity");
    const category = searchParams.get("category");

    const [showEmpty, setShowEmpty] = useState(false);

    const [isNewQuestionsChecked, setIsNewQuestionsChecked] = useState(false);
    const [isSaved, setIsSaved] = useState(!!currentQuestion?.saved);

    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const url = defineUrl();
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

    const defineUrl = () => {
        console.log('mode: ' + mode)
        let url;
        const userId = localStorage.getItem("userId");
        if(mode === "mistakes")
            return `wrong-questions?userId=${userId}`
        else if(mode === "saved")
            return `saved-questions?userId=${userId}`

        url = `/questions`;

        if(selectedThemeId !== 'all')
            url += `?themeId=${selectedThemeId}`;
        else if(category)
            url += `?categoryId=${category}`

        if(complexity)
            url += `&complexityLevel=${complexity}`;

        if(isNewQuestionsChecked)
            url += `&dateAdded=${NEW_QUESTIONS_START_DATE}`;

        if(userId)
            url += `&userId=${userId}`;
        return url;
    }

    const handleQuestionClick = (index) => {
        setIsAnswerChecked(false);
        setSelectedOption("");
        setCurrentQuestionIndex(currentPage * QUESTIONS_PER_PAGE + index);
        setIsSaved(!!questions[currentPage * QUESTIONS_PER_PAGE + index]?.saved)
        setShowHint(false);
    };

    const handleNextQuestionClick = () => {
        if (currentQuestionIndex < questions.length - 1)
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswerChecked(false);
        setIsSaved(!!questions[currentQuestionIndex + 1]?.saved);
        setShowHint(false);
    };

    const handleThemeClick = (themeId) => {
        setSelectedThemeId(themeId);
        setCurrentQuestionIndex(0);
        setCurrentPage(0);
        setAnswersCorrect({});
        setIsAnswerChecked(false);
        setSelectedOption("");
        setShowHint(false);
    };

    const checkAnswer = (item) => {
        if(isAnswerChecked)
            return;
        const isCorrect = item === currentQuestion.answer;
        setAnswersCorrect({
            ...answersCorrect,
            [currentQuestion.id]: isCorrect,
        });
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
        const startIndex = currentPage * QUESTIONS_PER_PAGE;
        const endIndex = startIndex + QUESTIONS_PER_PAGE;
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
                        className={defineClassName(question, index, startIndex)}
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

    const defineClassName = (question, index, startIndex) => {
        if(answersCorrect[question.id])
            return `question-number correct`;
        else if(answersCorrect[question.id] === false)
            return `question-number incorrect`;

        if(localStorage.getItem('token') && question.solved)
            return `question-number correct`;
        else if(localStorage.getItem('token') && question.solved === false)
            return `question-number incorrect`;

        if(startIndex + index === currentQuestionIndex)
            return `question-number active`;
        
        return `question-number`;
    }

    const goToPreviousPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1)
            setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        if (questions.length <= QUESTIONS_PER_PAGE) {
            setShowPrevArrow(false);
            setShowNextArrow(false);
        } else {
            setShowPrevArrow(currentPage > 0);
            setShowNextArrow(currentPage < Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1);
        }
    }, [currentPage, questions.length]);

    const handleNewQuestionsChange = () => setIsNewQuestionsChecked(!isNewQuestionsChecked);

    const handleSaveQuestion = async () => {
        console.log(currentQuestion.picturePath)
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
                            <button className={`save-button ${!!currentQuestion?.saved ? 'saved' : ''}`} onClick={handleSaveQuestion}>
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
                                                answersCorrect={answersCorrect}
                                                currentQuestionIndex={currentQuestionIndex}
                                                checkAnswer={checkAnswer}
                                                examMode={false}
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
                                            <MyButton isWhite onClick={() => setShowHint(true)}> Пояснення </MyButton>
                                            {
                                                currentQuestionIndex < (questions.length - 1) &&
                                                <MyButton onClick={handleNextQuestionClick}> Наступне </MyButton>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                }

                {
                    !mode
                    &&
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
                }
            </div>
        </div>
    );
};

export default Training;