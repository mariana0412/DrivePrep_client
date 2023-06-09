import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import "./RulesSideBar.css";

const RulesSideBar = () => {
  return (
    <div>
      <div>
        <ol>
          <li className="chapter">
            <Link to="#1" className="my-link">
              Загальні положення
            </Link>
          </li>
          <li className="chapter">
            <Link to="#2" className="my-link">
              Обов'язки і права водіїв механічних транспортних засобів
            </Link>
          </li>
          <li className="chapter">
            <Link to="#3" className="my-link">
              Рух транспортних засобів із спеціальними сигналами
            </Link>
          </li>
          <li className="chapter">
            <Link to="#4" className="my-link">
              Обов'язки і права пішоходів
            </Link>
          </li>
          <li className="chapter">
            <Link to="#5" className="my-link">
              Обов'язки і права пасажирів
            </Link>
          </li>
          <li className="chapter">
            <Link to="#6" className="my-link">
              Вимоги до велосипедистів
            </Link>
          </li>
          <li className="chapter">
            <Link to="#7" className="my-link">
              Вимоги до осіб, які керують гужовим транспортом і погоничів тварин
            </Link>
          </li>
          <li className="chapter">
            <Link to="#8" className="my-link">
              Регулювання дорожнього руху
            </Link>
          </li>
          <li className="chapter">
            <Link to="#9" className="my-link">
              Попереджувальні сигнали
            </Link>
          </li>
          <li className="chapter">
            <Link to="#10" className="my-link">
              Початок руху та зміна його напрямку
            </Link>
          </li>
          <li className="chapter">
            <Link to="#11" className="my-link">
              Розташування транспортних засобів на дорозі
            </Link>
          </li>
          <li className="chapter">
            <Link to="#12" className="my-link">
              Швидкість руху
            </Link>
          </li>
          <li className="chapter">
            <Link to="#13" className="my-link">
              Дистанція, інтервал, зустрічний роз'їзд
            </Link>
          </li>
          <li className="chapter">
            <Link to="#14" className="my-link">
              Обгін
            </Link>
          </li>
          <li className="chapter">
            <Link to="#15" className="my-link">
              Зупинка і стоянка
            </Link>
          </li>
          <li className="chapter">
            <Link to="#16" className="my-link">
              Проїзд перехресть
            </Link>
          </li>
          <li className="chapter">
            <Link to="#17" className="my-link">
              Переваги маршрутних транспортних засобів
            </Link>
          </li>
          <li className="chapter">
            <Link to="#18" className="my-link">
              Проїзд пішохідних переходів і зупинок транспортних засобів
            </Link>
          </li>
          <li className="chapter">
            <Link to="#19" className="my-link">
              Користування зовнішніми світловими приладами
            </Link>
          </li>
          <li className="chapter">
            <Link to="#20" className="my-link">
              Рух через залізничні переїзди
            </Link>
          </li>
          <li className="chapter">
            <Link to="#21" className="my-link">
              Перевезення пасажирів
            </Link>
          </li>
          <li className="chapter">
            <Link to="#22" className="my-link">
              Перевезення вантажу
            </Link>
          </li>
          <li className="chapter">
            <Link to="#23" className="my-link">
              Буксирування та експлуатація транспортних составів
            </Link>
          </li>
          <li className="chapter">
            <Link to="#24" className="my-link">
              Навчальна їзда
            </Link>
          </li>
          <li className="chapter">
            <Link to="#25" className="my-link">
              Рух транспортних засобів у колонах
            </Link>
          </li>
          <li className="chapter">
            <Link to="#26" className="my-link">
              Рух у житловій та пішохідній зоні
            </Link>
          </li>
          <li className="chapter">
            <Link to="#27" className="my-link">
              Рух по автомагістралях і дорогах для автомобілів
            </Link>
          </li>
          <li className="chapter">
            <Link to="#28" className="my-link">
              Рух по гірських дорогах і на крутих спусках
            </Link>
          </li>
          <li className="chapter">
            <Link to="#29" className="my-link">
              Міжнародний рух
            </Link>
          </li>
          <li className="chapter">
            <Link to="#30" className="my-link">
              Номерні, розпізнавальні знаки, написи і позначення
            </Link>
          </li>
          <li className="chapter">
            <Link to="#31" className="my-link">
              Технічний стан транспортних засобів та їх обладнання
            </Link>
          </li>
          <li className="chapter">
            <Link to="#32" className="my-link">
              Окремі питання організації дорожнього руху, що потребують
              узгодження
            </Link>
          </li>
          <li className="chapter">
            <Link to="#33" className="my-link">
              Дорожні знаки
            </Link>
          </li>
          <li className="chapter">
            <Link to="#34" className="my-link">
              Дорожня розмітка
            </Link>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default RulesSideBar;
