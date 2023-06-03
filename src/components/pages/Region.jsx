import React, { useState } from 'react';
import classes from './Region.module.css'
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import Map from "../../images/carNumberMap.svg"
import AppNavbar from "../AppNavbar/AppNavbar";


const regionData = {
    'Автономна Республіка Крим': ['АК', 'КК', '01'],
    'Вінницька область': ['АВ', 'КВ','02'],
    'Волинська область': ['АС', 'КС','03'],
    'Дніпропетровська область': ['АЕ', 'КЕ','04'],
    'Донецька область': ['АН', 'КН',	'05'],
    'Житомирська область': ['АМ', 'КМ','06'],
    'Закарпатська область': ['АТ', 'КО',	'07'],
    'Запорізька область': ['АР', 'КР',	'08'],
    'Івано-Франківська область': ['АТ', 'КТ', '09'],
    'Київ': ['АА', 'КА','11'],
    'Київська область': ['АI', 'КI','10'],
    'Кіровоградська область': ['ВА', 'НА',	'12'],
    'Луганська область': ['ВВ', 'НВ', '13'],
    'Львівська область': ['ВС', 'НС','14'],
    'Миколаївська область': ['ВЕ', 'НЕ', '15'],
    'Одеська область': ['ВН', 'НН',	'16'],
    'Полтавська область': ['ВІ', 'НI','17'],
    'Рівненська область': ['ВК', 'НК', '18'],
    'Севастополь': ['СН', 'IН',	'27'],
    'Сумська область': ['ВМ', 'НМ',	'19'],
    'Тернопільська область': ['ВО', 'АЛЕ','20'],
    'Харківська область': ['АХ', 'КХ','21'],
    'Херсонська область': ['ВТ', 'НТ',	'22'],
    'Хмельницька область': ['ВХ', 'НХ',	'23'],
    'Черкаська область': ['СА', 'IА',	'24'],
    'Чернігівська область': ['СВ', 'IВ','25'],
    'Чернівецька область': ['СЕ', 'ІЕ', '26'],
    'Загальнодержавні': ['II','28'],

};

function RegionCodeApp() {
    const [code, setCode] = useState('');
    const [region, setRegion] = useState('');

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    function getRegionFromCode(code) {
        const foundRegion = Object.entries(regionData).find(([region, codes]) =>
            codes.includes(code)
        );

        if (foundRegion) {
            return foundRegion[0];
        }

        return 'Такого коду не існує';
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (code.trim() === '') {
            setRegion('Код не введений');
            return;
        }

        const region = getRegionFromCode(code);

        setRegion(region);

    };

    return (
        <div>
            <AppNavbar/>
            <div className={classes.container}>
                <div className={classes.column}>
                    <img className={classes.logo} src={Map} alt="Region" />
                    <p>Визначте до якого регіону належить автомобіль, за його номерним знаком</p>
                </div>
                <div className={classes.column}>

                    <form className={classes.inForm} onSubmit={handleFormSubmit}>

                        <label>
                            Введіть код регіону:
                        </label>
                        <MyInput type="text" value={code} onChange={handleCodeChange} />

                        <MyButton type="submit">Перевірити</MyButton>
                    </form>

                    <div >
                        <label>Відповідь: </label>
                        <span>{region}</span> </div>
                </div>
            </div>
        </div>
    );
}

export default RegionCodeApp;
