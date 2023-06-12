import React, {useState} from 'react';
import classes from './BACCalculator.module.css'
import Image from "../../assets/alcotester.svg";
import MyInput from "../../components/UI/input/MyInput";
import MySelect from "../../components/UI/MySelect/MySelect";
import MyButton from "../../components/UI/button/MyButton";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

function BACCalculator() {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState('');
    const [timeSinceDrinking, setTimeSinceDrinking] = useState('');
    const [drinkVolume, setDrinkVolume] = useState('');
    const [drinkStrength, setDrinkStrength] = useState('');
    const [result, setResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [modalMessage, setModalMessage] = useState('Розробники не несуть відповідальність за будь-які прямі або непрямі збитки пов\'язані з використанням алкотестера');
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const calculateAlcoholLevel = () => {

        if (age === '') {
            setModalMessage('Будь ласка, вкажіть вік');
            openModal();
            return;
        }
        else if(age<18){
            setModalMessage('Вік має бути >= 18 років');
            openModal();
            return;
        }
        else if(gender === ''){
            setModalMessage('Будь ласка, вкажіть правильну стать');
            openModal();
            return;
        }
        else if( weight === ''){
            setModalMessage('Будь ласка, вкажіть вагу');
            openModal();
            return;
        }
        else if( weight<20){
            setModalMessage('Будь ласка, вкажіть правильну вагу');
            openModal();
            return;
        }
        else if(timeSinceDrinking === ''){
            setModalMessage('Будь ласка, вкажітьчас після вживання');
            openModal();
            return;
        }
        else if(timeSinceDrinking<0){
            setModalMessage('Будь ласка, вкажіть правильний час після вживання');
            openModal();
            return;
        }
        else if(drinkVolume === ''){
            setModalMessage('Будь ласка, вкажіть об\'єм вживаного');
            openModal();
            return;
        }
        else if(drinkVolume<0){
            setModalMessage('Будь ласка, вкажіть правильний об\'єм вживаного');
            openModal();
            return;
        }
        else if(drinkStrength === ''){
            setModalMessage('Будь ласка, вкажіть міцність вживаного');
            openModal();
            return;
        }
        else if(drinkStrength<0){
            setModalMessage('Будь ласка, вкажіть правильну міцність вживаного');
            openModal();
            return;
        }


        const r = gender === 'male' ? 0.68 : 0.55;
        const alcoholConsumed = (drinkVolume * drinkStrength) / 100;

        const alcoholLevel = (0.806 * alcoholConsumed * 1.2) / (weight * r) - (0.017 * timeSinceDrinking);

        let intoxicationStage = '';
        let canDrive = true;

        if(alcoholLevel < 0.3){
            intoxicationStage = 'Природний рівень';
        }
        else if (alcoholLevel < 0.5) {
            intoxicationStage = 'Незначний вплив';
        }  else if (alcoholLevel >= 0.5 && alcoholLevel < 1.5) {
            intoxicationStage = 'Легке сп\'яніння';
        }
        else if (alcoholLevel >= 1.5 && alcoholLevel < 2.5) {
            intoxicationStage = 'Середнє сп\'яніння';
        }else if (alcoholLevel >= 2.5 && alcoholLevel < 3) {
            intoxicationStage = 'Сильне сп\'яніння';
        } else {
            intoxicationStage = 'Критичний стан';
        }

        if (alcoholLevel > 0.2) {
            canDrive = false;
        }

        const result = {
            intoxicationStage,
            canDrive,
        };

        setResult(result);
        setModalMessage(`Стадія оп\'яніння: ${result.intoxicationStage}; Чи можна сідати за кермо: ${result.canDrive ? 'Так' : 'Ні'}`);
        openModal();
    };


    const genderOptions = [
        {value: 'male', name: 'Чоловік'},
        {value: 'female', name: 'Жінка'},
    ];

    return (
        <div>
            <AppNavbar/>
            <div className={classes.myPage}>

                <div className={classes.alcoholPageColumn}>

                    <div>
                        <img src={Image} alt="Image"/>
                        <p>Визначте рівень вмісту алкоголю в крові на основі введених даних</p>
                    </div>
                    <div className={classes.page}>
                        <div className={classes.column}>
                            <div>

                                <p>Вік:</p>
                                <MyInput type="number" value={age} onChange={(e) => setAge(e.target.value)}/>


                                <p> Стать:</p>
                                <MySelect
                                    options={genderOptions}
                                    defaultValue="Виберіть стать"
                                    value={gender}
                                    onChange={(selectedValue) => setGender(selectedValue)}
                                />

                                <p>Вага (кг):</p>
                                <MyInput type="number" value={weight} onChange={(e) => setWeight(e.target.value)}/>

                            </div>

                            <div>

                                <p>Час після вживання (години):</p>
                                <MyInput type="number" value={timeSinceDrinking}
                                         onChange={(e) => setTimeSinceDrinking(e.target.value)}/>

                                <p> Об'єм вживаного (мл):</p>
                                <MyInput type="number" value={drinkVolume}
                                         onChange={(e) => setDrinkVolume(e.target.value)}/>

                                <p> Міцність вживаного (%):</p>
                                <MyInput type="number" value={drinkStrength}
                                         onChange={(e) => setDrinkStrength(e.target.value)}/>

                            </div>

                        </div>
                        <MyButton type="button" onClick={calculateAlcoholLevel}>Розрахувати</MyButton>
                    </div>

                </div>


            </div>
            <CustomAlert
                isOpen={isModalOpen}
                onClose={closeModal}
                message={modalMessage}
            />
        </div>
    );
}

export default BACCalculator;
