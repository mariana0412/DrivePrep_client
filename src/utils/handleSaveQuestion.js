import QuestionService from "../services/QuestionService";

export async function handleSaveQuestion(isSaved, currentQuestion, questions, setQuestions, setIsSaved) {
    const questionId = currentQuestion.id;
    const userId = localStorage.getItem("userId");

    try {
        if (!isSaved)
            await QuestionService.saveSavedQuestion(userId, questionId);
        else
            await QuestionService.deleteSavedQuestion(userId, questionId);
        const updatedQuestions = questions.map((question) => {
            if (question.id === questionId)
                question.saved = !isSaved;
            return question;
        });
        setQuestions(updatedQuestions);
        setIsSaved(!isSaved);
    } catch (error) {
        console.error("Error:", error);
    }
}