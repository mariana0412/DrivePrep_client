import { Container, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import "./ModeSelection.css";
import MyButton from "../../components/UI/button/MyButton";

const ModeSelection = () => {
    const [selectedComplexity, setSelectedComplexity] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(2); // category B
    const [categoryOptions, setCategoryOptions] = useState([]);

    const handleComplexityChange = (e) => setSelectedComplexity(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

    const navigate = useNavigate();

    const handleStartButtonClick = () => {
        let url = `/training`;
        const urlToRedirect = determineUrlParams(url);
        navigate(urlToRedirect);
    }

    const handleExamButtonClick = () => {
        let url = `/exam`;
        let urlToRedirect = determineUrlParams(url);
        navigate(urlToRedirect);
    }

    const handleMistakesButtonClick = () => {
        const url = `/training?mode=mistakes`;
        navigate(url);
    }

    const handleSavedButtonClick = () => {
        const url = `/training?mode=saved`;
        navigate(url);
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

                {
                    localStorage.getItem('token')
                    &&
                    <div className="parentDiv">
                        <div className="childDiv">
                            <MyButton style={{ width: '220px', 'margin-top': '75px', 'margin-left': '-100px'}}
                                      onClick={handleMistakesButtonClick}>
                                Робота над помилками
                            </MyButton>
                        </div>
                        <div className="childDiv">
                            <MyButton style={{ width: '220px', 'margin-top': '75px', 'margin-left': '100px'}}
                                      onClick={handleSavedButtonClick}>
                                Збережені питання
                            </MyButton>
                        </div>
                    </div>
                }
            </div>
        </Container>
    );
};

export default ModeSelection;