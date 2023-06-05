export const calculateExamScore = (answersCorrect) => {
    let correctAnswers = 0;
    for (let questionId in answersCorrect)
        if (answersCorrect[questionId])
            correctAnswers++;
    return correctAnswers;
};