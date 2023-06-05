export default class QuestionService {
    static async saveSolvedQuestion(userId, questionId, isCorrect) {
        const solvedQuestion = {
            "id": {
                "questionId": questionId,
                "userId": userId
            },
            "correct": isCorrect
        };

        await fetch('http://localhost:8080/solved-questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(solvedQuestion),
        })
    }

    static async saveSavedQuestion(userId, questionId) {
        const savedQuestion = {
            "id": {
                "questionId": questionId,
                "userId": userId
            }
        };

        await fetch('http://localhost:8080/saved-questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(savedQuestion),
        })
    }

    static async deleteSavedQuestion(userId, questionId) {
        await fetch(`http://localhost:8080/saved-questions/${questionId}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

}