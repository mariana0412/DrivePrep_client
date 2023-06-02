import { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar/AppNavbar";
import MyButton from "../UI/button/MyButton";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const SignUp = () => {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(3); // category B
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSurnameChange = (e) => setSurname(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);

  useEffect(() => {
    fetch(`/categories`)
      .then((response) => response.json())
      .then((data) => setCategoryOptions(data));
  }, []);

  const renderCategoryOptions = () => {
    return categoryOptions.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ));
  };

  return (
    <div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <div style={{ padding: "10px", margin: "10px" }}>
          <Label for="surname" style={{ display: "block", padding: "10px" }}>
            Прізвище:{" "}
          </Label>
          <Input
            className="largeInput"
            type="text"
            id="surname"
            value={surname}
            onChange={handleSurnameChange}
            style={{ width: "300px", borderRadius: "15px" }} // Adjust the width here
          ></Input>
        </div>
        <div style={{ padding: "10px", margin: "10px" }}>
          <Label for="name" style={{ display: "block", padding: "10px" }}>
            Ім'я:{" "}
          </Label>
          <Input
            className="largeInput"
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            style={{ width: "300px", borderRadius: "15px" }} // Adjust the width here
          ></Input>
        </div>

        <div style={{ padding: "10px", margin: "10px" }}>
          <Label for="selectCategory"style={{ display: "block", padding: "10px" }}>
            Категорія: 
          </Label>
          <Input
            className="largeInput"
            type="select"
            id="selectCategory"
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ width: "307.2px", height:"45.2px", border: "2px solid black", borderRadius: "15px" }} // Adjust the width here
          >
            {renderCategoryOptions()}
          </Input>
        </div>
        <div style={{ padding: "10px", margin: "10px" }}>
          <Label for="email" style={{ display: "block", padding: "10px" }}>
            Електронна пошта:{" "}
          </Label>
          <Input
            className="largeInput"
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            style={{ width: "300px", borderRadius: "15px" }} // Adjust the width here
          ></Input>
        </div>

        <div style={{ padding: "10px", margin: "10px" }}>
          <Label for="password" style={{ display: "block", padding: "10px" }}>
            Пароль:{" "}
          </Label>
          <Input
            size="300"
            className="largeInput"
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ width: "300px", borderRadius: "15px" }} // Adjust the width here
          ></Input>
        </div>
        <div style={{ padding: "10px", margin: "10px" }}>
          <Label
            for="repeatPassword"
            style={{ display: "block", padding: "10px" }}
          >
            Повторіть пароль:{" "}
          </Label>
          <Input
            size="300"
            className="largeInput"
            type="text"
            id="repeatPassword"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            style={{ width: "300px", borderRadius: "15px" }} // Adjust the width here
          ></Input>
        </div>
      </div>
      <div />
      <div
        style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: "10px",
          margin: "10px",
        }}
      >
        <MyButton size="sm" style={{ width: "300px" }}>
          Зареєструватись
        </MyButton>
      </div>
    </div>
  );
};

export default SignUp;
