import {useEffect, useState} from "react";

const Variants = ({ currentQuestion, selectedOption, answersCorrect, currentQuestionIndex, checkAnswer }) => {
    const [shuffledVariants, setShuffledVariants] = useState([]);

    useEffect(() => {
        const variants = [currentQuestion.answer, currentQuestion.var1];
        if (currentQuestion.var2)
            variants.push(currentQuestion.var2);
        if (currentQuestion.var3)
            variants.push(currentQuestion.var3);
        setShuffledVariants(shuffleVariants(variants));
    }, [currentQuestion]);

    const shuffleVariants = (variants) => {
        const shuffledVariants = [...variants];
        for (let i = shuffledVariants.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledVariants[i], shuffledVariants[j]] = [shuffledVariants[j], shuffledVariants[i]];
        }
        return shuffledVariants;
    };

    return (
        <ul className="variants">
            {shuffledVariants.map((item) => {
                const variantClass = `variant answer-label ${
                    selectedOption === item && answersCorrect[currentQuestionIndex]
                        ? "correct"
                        : selectedOption === item && answersCorrect[currentQuestionIndex] === false
                            ? "incorrect"
                            : ""
                }`;

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