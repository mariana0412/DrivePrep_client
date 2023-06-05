import { useEffect, useState } from "react";
import MyButton from "../../components/UI/button/MyButton";
import { Label, Input } from "reactstrap";

const SignUpForm = () => {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(2); // category B
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

  const handleSignUp = () => {
    if(!passwordIsValid() || !emailIsValid())
      return;

    const userData = {
      surname: surname,
      name: name,
      patronymic: "", // Assuming the patronymic is not part of the form
      categoryId: selectedCategory,
      email: email,
      password: password,
    };

    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
        .then((response) => {
          if (response.ok) {
            alert(`${name}, ласкаво просимо до DrivePrep! Тепер Ви можете ввійти у Ваш профіль.`);
            clearInputFields();
          } else {
            throw new Error(response.status);
          }
        })
        .catch((error) => {
          if (error.message === "400") {
            alert("Ця електронна пошта вже використовується. Будь ласка, увійдіть у Ваш аккаунт.");
          } else {
            console.error(error);
          }
        });
  };

  const passwordIsValid = () => passwordLengthIsValid() && repeatPasswordIsEqualToPassword();

  const passwordLengthIsValid = () => {
    if (password.length < 8) {
      alert("Пароль має мати більш ніж 8 символів!");
      return false;
    }
    return true;
  }

  const repeatPasswordIsEqualToPassword = () => {
    if (password !== repeatPassword) {
      alert("Паролі не збігаються!");
      return false;
    }
    return true;
  }

  const emailIsValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const rusRegex = /.ru$/
    if (!emailRegex.test(email)) {
      alert("Будь-ласка, введіть коректну електронну адресу.");
      return false;
    }
    else if(rusRegex.test(email)){
      alert("Система не підтримує використання РОСІЙСЬКИХ поштових адрес");
      return false;
    }
    return true;
  }

  const clearInputFields = () => {
    setSurname("");
    setName("");
    setSelectedCategory(2);
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  }

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
            style={{ width: "300px", borderRadius: "15px" }}
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
            style={{ width: "300px", borderRadius: "15px" }}
          ></Input>
        </div>

        <div style={{ padding: "10px", margin: "10px" }}>
          <Label for="selectCategory" style={{ display: "block", padding: "10px" }}>
            Категорія:
          </Label>
          <Input
            className="largeInput"
            type="select"
            id="selectCategory"
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ width: "307.2px", height:"45.2px", border: "2px solid black", borderRadius: "15px" }}
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
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            style={{ width: "300px", borderRadius: "15px" }}
          ></Input>
        </div>

        <div style={{ padding: "10px", margin: "10px" }}>
          <Label for="password" style={{ display: "block", padding: "10px" }}>
            Пароль:{" "}
          </Label>
          <Input
            size="300"
            className="largeInput"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ width: "300px", borderRadius: "15px" }}
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
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            style={{ width: "300px", borderRadius: "15px" }}
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
        <MyButton size="sm" style={{ width: "300px" }} onClick={handleSignUp}>
          Зареєструватись
        </MyButton>
      </div>
    </div>
  );
};

export default SignUpForm;
