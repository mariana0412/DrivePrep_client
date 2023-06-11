import React, { useState } from 'react';
import classes from './Region.module.css'
import Map from "../../assets/carNumberMap.svg"
import MyButton from "../../components/UI/button/MyButton";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import MyInput from "../../components/UI/input/MyInput";


const regionData = {
    'Автономна Республіка Крим': ['AK', 'KK', '01'],
    'Вінницька область': ['AB', 'KB','02'],
    'Волинська область': ['AC', 'KC','03'],
    'Дніпропетровська область': ['AE', 'KE','04'],
    'Донецька область': ['AH', 'KH','05'],
    'Житомирська область': ['AM', 'KM','06'],
    'Закарпатська область': ['AT', 'KO',	'07'],
    'Запорізька область': ['AP', 'KP',	'08'],
    'Івано-Франківська область': ['AT', 'KT', '09'],
    'Київ': ['AA', 'KA','11'],
    'Київська область': ['AI', 'KI','10'],
    'Кіровоградська область': ['BA', 'HA',	'12'],
    'Луганська область': ['BB', 'HB', '13'],
    'Львівська область': ['BC', 'HC','14'],
    'Миколаївська область': ['BE', 'HE', '15'],
    'Одеська область': ['BH', 'HH',	'16'],
    'Полтавська область': ['BI', 'HI','17'],
    'Рівненська область': ['BK', 'HK', '18'],
    'Севастополь': ['CH', 'IH',	'27'],
    'Сумська область': ['BM', 'HM',	'19'],
    'Тернопільська область': ['BO','20'],
    'Харківська область': ['AX', 'KX','21'],
    'Херсонська область': ['BT', 'HT',	'22'],
    'Хмельницька область': ['BX', 'HX',	'23'],
    'Черкаська область': ['CA', 'IA',	'24'],
    'Чернігівська область': ['CB', 'IB','25'],
    'Чернівецька область': ['CE', 'IE', '26'],
    'Загальнодержавні': ['II','28'],

};


const characterMap = {
    А: 'A',
    В: 'B',
    Е: 'E',
    І: 'I',
    К:'K',
    М: 'M',
    Н:'H',
    О:'O',
    Р:'P',
    С:'C',
    Т:'T',
    Х:'X',
};

const normalizeInput = (input) => {
    const normalizedInput = input.toUpperCase();
    return normalizedInput.replace(/[А-ЯІЇ]/g, (match) => characterMap[match]);
};

function RegionCodeApp() {
    const [code, setCode] = useState('');
    const [region, setRegion] = useState('');

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const getRegionFromCode = (code) => {
        const normalizedCode = normalizeInput(code);

        const foundRegion = Object.entries(regionData).find(([region, codes]) =>
            codes.includes(normalizedCode.toUpperCase())
        );
        if (foundRegion) {
            return foundRegion[0];
        }
        return 'Такого коду не існує';
    };

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
