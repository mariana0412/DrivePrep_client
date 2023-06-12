import {useEffect, useState} from "react";

// Variants component definition. It receives various props such as currentQuestion, selectedOption, etc.
const Variants = ({ currentQuestion, selectedOption, currentQuestionIndex, checkAnswer,
                          examMode, examFinished, selectedAnswers }) => {
    // State for storing the shuffled variants of the current question.
    const [shuffledVariants, setShuffledVariants] = useState([]);

    // useEffect hook that gets called whenever currentQuestion changes.
    useEffect(() => {
        const variants = [currentQuestion.answer, currentQuestion.var1];
        if (currentQuestion.var2)
            variants.push(currentQuestion.var2);
        if (currentQuestion.var3)
            variants.push(currentQuestion.var3);
        setShuffledVariants(shuffleVariants(variants));
    }, [currentQuestion]);

    // Function to shuffle an array of variants.
    const shuffleVariants = (variants) => {
        const shuffledVariants = [...variants];
        for (let i = shuffledVariants.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledVariants[i], shuffledVariants[j]] = [shuffledVariants[j], shuffledVariants[i]];
        }
        return shuffledVariants;
    }

    // Function to determine the CSS class name of each variant.
    const variantClassName = (item) => {
        let variantClass = `variant answer-label `;
        let userAnswer = selectedOption;
        if(examMode)
            userAnswer = selectedAnswers[currentQuestionIndex];

        if(userAnswer === item) {
            if(!examMode || examFinished)
                variantClass += (item === currentQuestion.answer) ? "correct" : "incorrect";
            else if(examMode && !examFinished)
                variantClass += `chosen`;
        }

        if (examMode && examFinished && item === currentQuestion.answer && item !== userAnswer)
            variantClass += "correct";

        return variantClass;
    }

    // Render the component
    return (
        <ul className="variants">
            {shuffledVariants.map((item) => {
                const variantClass = variantClassName(item);

                return (
                    <li key={item} className={variantClass} onClick={() => checkAnswer(item)}>
                        {item}
                    </li>
                );
            })}
        </ul>
    );
};

export default Variants;