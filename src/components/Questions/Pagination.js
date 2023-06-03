const Pagination = ({ currentPage, questionsPerPage, currentQuestionIndex, handleQuestionClick, showPrevArrow,
                           showNextArrow, goToPreviousPage, goToNextPage, questions, answersCorrect }) => {
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
                        ${answersCorrect[startIndex + index] ? "correct" : ""}
                        ${answersCorrect[startIndex + index] === false ? "incorrect" : ""}
                        
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
}

export default Pagination;