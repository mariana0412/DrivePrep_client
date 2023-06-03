import {useEffect, useState} from "react";
import "./Questions.css";
import AppNavbar from "../AppNavbar/AppNavbar";
import MyButton from "../UI/button/MyButton";
import ThemesList from "./ThemesList";
import Pagination from "./Pagination";
import Variants from "./Variants";
import ExplanationModal from "./ExplanationModal";

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

    const searchParams = new URLSearchParams(window.location.search);
    const complexity = searchParams.get("complexity");
    const category = searchParams.get("category");

    const [showEmpty, setShowEmpty] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [explanation, setExplanation] = useState("");

    const [isNewQuestionsChecked, setIsNewQuestionsChecked] = useState(false);

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
        setIsAnswerChecked(false);
        setSelectedOption("");
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

        const userId = localStorage.getItem("userId");

        if (userId) {
            const questionId = currentQuestion.id;

            let solvedQuestion = {
                "id": {
                    "questionId": questionId,
                    "userId": userId
                },
                "correct": isCorrect
            };

            fetch('http://localhost:8080/solved-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(solvedQuestion),
            })
                .then(response => response.text())
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    const renderPagination = () => {
        const startIndex = currentPage * questionsPerPage;
        const endIndex = startIndex + questionsPerPage;
        const pageQuestions = questions.slice(startIndex, endIndex);

        return (
            <Pagination
                currentPage={currentPage}
                questionsPerPage={questionsPerPage}
                currentQuestionIndex={currentQuestionIndex}
                handleQuestionClick={handleQuestionClick}
                showPrevArrow={showPrevArrow}
                showNextArrow={showNextArrow}
                goToPreviousPage={goToPreviousPage}
                goToNextPage={goToNextPage}
                questions={pageQuestions}
                answersCorrect={answersCorrect}
            />
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
        setExplanation(explanation);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setExplanation("");
    };

    const handleNewQuestionsChange = () => {
        setIsNewQuestionsChecked(!isNewQuestionsChecked);
    };

    return (
        <div>
            <AppNavbar />
            <div className="question-numbers">
                {renderPagination()}
            </div>

            <div className="parentDiv">
                {showEmpty ?
                    <div className="text-center">
                        <div className="content">Таких питань нема.</div>
                    </div>
                    :
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
                                    answersCorrect={answersCorrect}
                                    currentQuestionIndex={currentQuestionIndex}
                                    checkAnswer={checkAnswer}
                                />

                                <div>
                                    <MyButton isWhite onClick={() => openModal(currentQuestion.tips)}> Пояснення </MyButton>
                                    {
                                        currentQuestionIndex < (questions.length - 1) &&
                                        <MyButton onClick={handleNextQuestion}> Наступне </MyButton>
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

            <ExplanationModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                explanation={explanation}
            />
        </div>
    );
};

export default Questions;
