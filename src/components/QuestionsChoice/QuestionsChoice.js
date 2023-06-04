import { Container, Input, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import "./QuestionsChoice.css";
import MyButton from "../UI/button/MyButton";

const QuestionsChoice = () => {
    const [selectedComplexity, setSelectedComplexity] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(2); // category B
    const [categoryOptions, setCategoryOptions] = useState([]);

    const handleComplexityChange = (e) => setSelectedComplexity(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

    const navigate = useNavigate();

    const handleStartButtonClick = () => {
        let url = `/questions`;
        const urlToRedirect = determineUrlParams(url);
        navigate(urlToRedirect);
    }

    const determineUrlParams = (baseUrl) => {
        const categoryId = determineCategoryId();
        baseUrl += `?category=${categoryId}`;

        if(selectedComplexity)
            baseUrl += `&complexity=${selectedComplexity}`;
        return baseUrl;
    }

    const determineCategoryId = () => {
        const userCategoryId = localStorage.getItem("userCategoryId");
        return userCategoryId ? userCategoryId : selectedCategory;
    }

    const handleExamButtonClick = () => {
        let url = `/exam`;
        let urlToRedirect = determineUrlParams(url);
        navigate(urlToRedirect);
    }

    useEffect(() => {
        fetch(`/categories`)
            .then(response => response.json())
            .then(data => setCategoryOptions(data));
    }, []);

    const complexityOptions = [
        { value: "", label: "Будь-яка" },
        { value: "1", label: "Легка" },
        { value: "2", label: "Середня" },
        { value: "3", label: "Складна" },
        { value: "4", label: "Дуже складна" }
    ];

    const renderComplexityOptions = () => {
        return complexityOptions.map(option => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ));
    };

    const renderCategoryOptions = () => {
        return categoryOptions.map(option => (
            <option key={option.id} value={option.id}>
                {option.name}
            </option>
        ));
    };

    return (
        <Container className="my-page-container">
            <div className="centered-content">
                <Row>
                    <div >
                        <div className="inputDiv">
                            <Label for="select1">Складність: </Label>
                            <Input
                                className="largeInput"
                                type="select"
                                id="select1"
                                value={selectedComplexity}
                                onChange={handleComplexityChange}
                            >
                                {renderComplexityOptions()}
                            </Input>
                        </div>
                        {!localStorage.getItem("token") &&
                            <div className="inputDiv">
                                <Label for="selectCategory">Категорія: </Label>
                                <Input
                                    className="largeInput"
                                    type="select"
                                    id="selectCategory"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                >
                                    {renderCategoryOptions()}
                                </Input>
                            </div>
                        }
                    </div>

                    <div className="parentDiv">
                        <div className="childDiv">
                            <MyButton isWhite onClick={handleStartButtonClick}>
                                Почати
                            </MyButton>
                            <br/>
                            <label>Оберіть тему та тренуйтеся</label>
                        </div>
                        <div className="childDiv">
                            <MyButton onClick={handleExamButtonClick}>
                                Іспит
                            </MyButton>
                            <br/>
                            <label>Випадкові 20 питань за 20 хвилин</label>
                        </div>
                    </div>
                    {/*TODO: add two buttons for authenticated User*/}
                </Row>
            </div>
        </Container>
    );
};

export default QuestionsChoice;