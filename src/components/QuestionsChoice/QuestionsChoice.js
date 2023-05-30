import { Container, Input, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import "./QuestionsChoice.css";
import MyButton from "../UI/button/MyButton";

const QuestionsChoice = () => {
    const navigate = useNavigate();
    const [selectedComplexity, setSelectedComplexity] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryOptions, setCategoryOptions] = useState([]);

    const handleComplexityChange = (e) => setSelectedComplexity(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

    const handleStartButtonClick = () => navigate("/questions");
    const handleExamButtonClick = () => navigate("/next-page2");

    useEffect(() => {
        fetch(`/categories`)
            .then(response => response.json())
            .then(data => setCategoryOptions(data));
    }, []);

    const complexityOptions = [
        { value: "", label: "Будь-яка" },
        { value: "1", label: "Легка" },
        { value: "2", label: "Середня" },
        { value: "3", label: "Складна" }
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