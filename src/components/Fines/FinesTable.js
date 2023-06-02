import React from 'react';

const FinesTable = () => {
    return (
        <div className="table-container">
            <table className="fines-table">
                <thead>
                    <th>Стаття КУпАП</th>
                    <th>Порушення</th>
                    <th>Штраф</th>
                </thead>

                <tbody>
                <tr>
                    <td>121<sup>1</sup> ч.1</td>
                    <td>Експлуатація водіями транспортних засобів, ідентифікаційні номери складових частин яких не відповідають записам у реєстраційних документах, знищені або підроблені;</td>
                    <td>255 грн</td>
                </tr>
                <tr>
                    <td>121<sup>2</sup> ч.1</td>
                    <td>Перевезення водіями транспортних засобів, що працюють у режимі маршрутних таксі, пасажирів понад максимальну кількість, передбачену технічною характеристикою транспортного засобу або визначену в реєстраційних документах на цей транспортний засіб, а також перевезення водіями транспортних засобів, що здійснюють міжміські чи міжнародні перевезення, пасажирів, кількість яких перевищує кількість місць для сидіння, передбачену технічною характеристикою транспортного засобу або визначену в реєстраційних документах на цей транспортний засіб;</td>
                    <td>170 грн</td>
                </tr>
                <tr>
                    <td>121<sup>2</sup> ч.2</td>
                    <td>Порушення водіями транспортних засобів, що працюють у режимі маршрутних таксі, правил зупинки під час здійснення посадки (висадки) пасажирів;</td>
                    <td>255 грн</td>
                </tr>
                <tr>
                    <td>121<sup>2</sup> ч.3</td>
                    <td>Перевезення пасажирів на автобусному маршруті протяжністю понад п'ятсот кілометрів одним водієм;</td>
                    <td>170 грн</td>
                </tr>
                <tr>
                    <td>121<sup>3</sup> ч.1</td>
                    <td>Порушення вимог законодавства щодо використання номерних знаків транспортних засобів: 1) керування або експлуатація транспортного засобу без номерного знака; 2) з номерним знаком, що не належить цьому засобу; 3) з номерним знаком, який не відповідає встановленим зразкам або вимогам; 4) з номерним знаком, закріпленим у не встановленому для цього місці; 5) з перевернутим, неосвітленим чи закритим іншими предметами (в тому числі прозорими); 6) з нанесенням покриття на номерний знак або застосуванням матеріалів, що перешкоджають чи ускладнюють ідентифікацію; 7) із забрудненим номерним знаком, якщо така забрудненість не дає можливості чітко визначити символи або буквено-числову комбінацію номерного знака з відстані двадцяти метрів; 8) вчинення інших дій, спрямованих на умисне приховування номерного знака.</td>
                    <td>1190 грн</td>
                </tr>
                <tr>
                    <td>121<sup>3</sup> ч.2</td>
                    <td>Керування або експлуатація транспортного засобу із незаконно встановленими номерними знаками: 1) Збройних Сил України; 2) Національної гвардії України; 3) Національної поліції України; 4) Державної прикордонної служби України;5) Державної служби з надзвичайних ситуацій; 6) Державної спеціальної служби транспорту; 7) Державної служби спеціального зв'язку та захисту інформації; 8) Дипломатичних представництв, консульств та інших міжнародних організацій, які користуються повним та частковим імунітетом.</td>
                    <td>2250 грн</td>
                </tr>
                <tr>
                    <td>121<sup>3</sup> ч.3</td>
                    <td>Повторне протягом року вчинення порушень, передбачених частиною другою цієї статті, за яке особу вже було піддано адміністративному стягненню.</td>
                    <td>5100 грн</td>
                </tr>
                <tr>
                    <td>121 ч.1</td>
                    <td>Керування водієм транспортним засобом, що має несправності системи гальмового або рульового керування, тягово-зчіпного пристрою, зовнішніх світлових приладів (темної пори доби) чи інші технічні несправності, з якими відповідно до встановлених правил експлуатація його забороняється, або переобладнаний з порушенням відповідних правил, норм і стандартів;</td>
                    <td>340 грн</td>
                </tr>
                <tr>
                    <td>121 ч.2</td>
                    <td>Керування водієм транспортним засобом, який використовується для надання послуг з перевезення пасажирів, що має несправності, передбачені ст. 121 ч.1, або технічний стан і обладнання якого не відповідають вимогам стандартів, правил дорожнього руху і технічної експлуатації;</td>
                    <td>680 грн</td>
                </tr>
                <tr>
                    <td>121 ч.3</td>
                    <td>Керування водієм транспортним засобом, що підлягає обов'язковому технічному контролю, але своєчасно його не пройшов;</td>
                    <td>340 грн</td>
                </tr>
                <tr>
                    <td>121 ч.4</td>
                    <td>Повторне протягом року вчинення будь-якого з порушень, передбачених ст. 121 ч1, 2, 3;
                        <br></br>* <i>Штраф з позбавленням права керування транспортними засобами на строк від трьох до шести місяців або адміністративний арешт на строк від п'яти до десяти діб.</i></td>
                    <td>850 - 1700 грн</td>
                </tr>
                <tr>
                    <td>121 ч.5</td>
                    <td>Порушення правил користування ременями безпеки або мотошоломами;</td>
                    <td>510 грн</td>
                </tr>
                <tr>
                    <td>121 ч.6</td>
                    <td>Керування водієм транспортним засобом, не зареєстрованим або не перереєстрованим в установленому порядку;</td>
                    <td>850 грн</td>
                </tr>
                <tr>
                    <td>121 ч.7</td>
                    <td>Повторне протягом року вчинення будь-якого з порушень, передбачених ст. 121 ч.6;
                        <br></br>* <i>Штраф або громадські роботи на строк від тридцяти до сорока годин, з оплатним вилученням транспортного засобу чи без такого.</i></td>
                    <td>1700 грн</td>
                </tr>
                <tr>
                    <td>121 ч.8</td>
                    <td>Керування водієм ТЗ, щодо якого порушено обмеження, встановлені Митним кодексом України, а саме: порушено строки його тимчасового ввезення та/або переміщення в митному режимі транзиту; ТЗ використовується для цілей підприємницької діяльності та/або отримання доходів в Україні; ТЗ передано у володіння, користування або розпорядження особі, яка не ввозила його на митну територію України або не поміщувала в митний режим транзиту</td>
                    <td>8500 грн</td>
                </tr>
                <tr>
                    <td>121 ч.9</td>
                    <td>Повторне протягом року вчинення порушення, передбаченого ч.8 цієї статті <br></br> * Штраф 17000 грн з позбавленням права керування ТЗ на строк 1 рік та з оплатним вилученням ТЗ чи без такого</td>
                    <td>17000 грн</td>
                </tr>
                <tr>
                    <td>121 ч.10</td>
                    <td>Порушення правил перевезення дітей. Коментар до статті.  Згідно п. 21.11 "б" ПДР, забороняється перевозити дітей, зріст яких менше 145 см у транспортних засобах, обладнаних ременями безпеки, без використання спеціальних засобів, що дають змогу пристебнути дитину за допомогою ременів безпеки, передбачених конструкцією цього транспортного засобу; на передньому сидінні легкового автомобіля — без використання зазначених спеціальних засобів; на задньому сидінні мотоцикла та мопеда;</td>
                    <td>510 грн</td>
                </tr>
                <tr>
                    <td>121 ч.11</td>
                    <td>Повторне протягом року вчинення порушення вимог ст. 121 ч.10 (порушення правил перевезення дітей);</td>
                    <td>850 грн</td>
                </tr>
                <tr>
                    <td>122<sup>2</sup></td>
                    <td>Невиконання водіями вимог поліцейського, а водіями військових транспортних засобів - вимог посадової особи військової інспекції безпеки дорожнього руху Військової служби правопорядку у Збройних Силах України про зупинку транспортного засобу;
                        <br></br>* <i>Штраф або позбавлення права керування транспортними засобами на строк від трьох до шести місяців.</i></td>
                    <td>153 грн</td>
                </tr>
                <tr>
                    <td>122<sup>4</sup></td>
                    <td>Залишення водіями транспортних засобів, іншими учасниками дорожнього руху на порушення встановлених правил місця дорожньо-транспортної пригоди, до якої вони причетні;
                        <br></br>* <i>Штраф або позбавлення права керування транспортними засобами на строк від одного до двох років.</i></td>
                    <td>3400 грн</td>
                </tr>
                <tr>
                    <td>122<sup>5</sup></td>
                    <td>Порушення вимог законодавства щодо встановлення і використання на транспортному засобі спеціальних світлових або звукових сигнальних пристроїв;
                        <br></br>* <i>Штраф з конфіскацією спеціальних світлових або звукових сигнальних пристроїв.</i></td>
                    <td>8500 грн</td>
                </tr>
                <tr>
                    <td>122 ч.1</td>
                    <td>Перевищення водіями транспортних засобів встановлених обмежень швидкості руху транспортних засобів більш як на двадцять кілометрів на годину, порушення вимог дорожніх знаків та розмітки проїзної частини доріг, правил перевезення вантажів, буксирування транспортних засобів, зупинки, стоянки, проїзду пішохідних переходів, ненадання переваги у русі пішоходам на нерегульованих пішохідних переходах, а так само порушення встановленої для транспортних засобів заборони рухатися тротуарами чи пішохідними доріжками;</td>
                    <td>340 грн</td>
                </tr>
                <tr>
                    <td>122 ч.2</td>
                    <td>Порушення водіями транспортних засобів: 1) правил проїзду перехресть; 2) правил проїду зупинок транспортних засобів загального користування; 3) проїзду на заборонний сигнал світлофора або жест регулювальника; 4) правил обгону; 5) правил зустрічного роз'їзду; 6) вимог щодо дотримання безпечної дистанції або інтервалу; 7) правил розташування транспортних засобів на проїзній частині; 8) правил руху автомагістралями; 9) правил користування зовнішніми освітлювальними приладами або попереджувальними сигналами при початку руху чи зміні його напрямку, використання цих приладів та їх переобладнання з порушенням вимог відповідних стандартів; 10) правил користування водієм під час руху транспортного засобу засобами зв'язку, не обладнаними технічними пристроями, що дозволяють вести перемови без допомоги рук (за винятком водіїв оперативних транспортних засобів під час виконання ними невідкладного службового завдання); 11) правил навчальної їзди.</td>
                    <td>510 грн</td>
                </tr>
                <tr>
                    <td>122 ч.3</td>
                    <td>Ненадання переваги в русі транспортним засобам аварійно-рятувальних служб, швидкої медичної допомоги, пожежної охорони, поліції, що рухаються з увімкненими спеціальними світловими або звуковими сигнальними пристроями, ненадання переваги маршрутним транспортним засобам, у тому числі порушення правил руху і зупинки на смузі для маршрутних транспортних засобів, а так само порушення правил зупинки, стоянки, що створюють перешкоди дорожньому руху або загрозу безпеці руху;</td>
                    <td>680 грн</td>
                </tr>
                <tr>
                    <td>122 ч.4</td>
                    <td>Перевищення водіями транспортних засобів встановлених обмежень швидкості руху транспортних засобів більш як на п'ятдесят кілометрів на годину.</td>
                    <td>1700 грн.</td>
                </tr>
                <tr>
                    <td>122 ч.5</td>
                    <td>Порушення, передбачені частинами першою – четвертою цієї статті, що спричинили створення аварійної обстановки, а саме: примусили інших учасників дорожнього руху різко змінити швидкість, напрямок руху або вжити інших заходів щодо забезпечення особистої безпеки або безпеки інших громадян, що підтверджені фактичними даними, а саме: поясненнями особи, яка притягається до адміністративної відповідальності, потерпілого, свідків, показань технічних приладів та засобів фото- і відеоспостереження та іншими документами;<br/>
                        <br></br>* <i>Штраф або позбавлення права керування транспортними засобами на строк від шести місяців до одного року.</i></td>
                    <td>1445 грн.</td>
                </tr>
                <tr>
                    <td>122 ч.6</td>
                    <td>Зупинка чи стоянка транспортних засобів на місцях, що позначені відповідними дорожніми знаками або дорожньою розміткою, на яких дозволено зупинку чи стоянку лише транспортних засобів, якими керують водії з інвалідністю або водії, які перевозять осіб з інвалідністю (крім випадків вимушеної стоянки), а так само створення перешкод водіям з інвалідністю або водіям, які перевозять осіб з інвалідністю, у зупинці чи стоянці керованих ними транспортних засобів, неправомірне використання на транспортному засобі розпізнавального знака "Водій з інвалідністю".</td>
                    <td>1020 - 1700 грн</td>
                </tr>
                <tr>
                    <td>122 ч.7</td>
                    <td>Зупинка чи стоянка транспортних засобів на місцях, що позначені відповідними дорожніми знаками та/або дорожньою розміткою, на яких дозволено зупинку чи стоянку лише транспортних засобів, оснащених електричними двигунами (одним чи декількома), а так само створення перешкод водіям транспортних засобів, оснащених електричними двигунами (одним чи декількома), у зупинці або стоянці.</td>
                    <td>340 - 680 грн</td>
                </tr>
                <tr>
                    <td>123 ч.1</td>
                    <td>Порушення особою, яка керує транспортним засобом, правил руху через залізничний переїзд, крім порушень, передбачених частинами другою і третьою цієї статті;</td>
                    <td>340 грн.</td>
                </tr>
                <tr>
                    <td>123 ч.2</td>
                    <td>В'їзд на залізничний переїзд особою, яка керує транспортним засобом, у випадках, коли рух через переїзд заборонений;<br/>
                        <br></br>* <i>Штраф з оплатним вилученням транспортного засобу у його власника чи без такого або позбавлення права керування транспортними засобами на строк від шести місяців до одного року з оплатним вилученням транспортного засобу у його власника чи без такого або адміністративний арешт на строк від семи до десяти діб з оплатним вилученням транспортного засобу у його власника чи без такого.</i></td>
                    <td>850 грн.</td>
                </tr>
                <tr>
                    <td>123 ч.3</td>
                    <td>Порушення, передбачене частиною другою цієї статті, вчинене водієм транспортного засобу під час надання послуг з перевезення пасажирів або під час перевезення небезпечних вантажів;<br/>
                        <br></br>* <i>Тягне за собою позбавлення права керування транспортними засобами на строк від одного до трьох років з оплатним вилученням транспортного засобу у його власника чи без такого або адміністративний арешт на строк від десяти до п'ятнадцяти діб з оплатним вилученням транспортного засобу у його власника чи без такого.</i></td>
                    <td></td>
                </tr>
                <tr>
                    <td>124</td>
                    <td>Порушення учасниками дорожнього руху Правил дорожнього руху, що спричинило пошкодження транспортних засобів, вантажу, автомобільних доріг, вулиць, залізничних переїздів, дорожніх споруд чи іншого майна;<br/>
                        <br></br>* <i>Штраф або позбавлення права керування транспортними засобами на строк від шести місяців до одного року. Примітка. Особа, цивільно-правова відповідальність якої застрахована, звільняється від адміністративної відповідальності за порушення правил дорожнього руху, що спричинило пошкодження транспортних засобів, за умови, що учасники дорожньо-транспортної пригоди скористалися правом спільно скласти повідомлення про цю пригоду відповідно до Закону України "Про обов'язкове страхування цивільно-правової відповідальності власників наземних транспортних засобів".</i></td>
                    <td>850 грн</td>
                </tr>
                <tr>
                    <td>124<sup>1</sup></td>
                    <td>Ненадання посадовими особами підприємств, установ, організацій і громадянами транспортних засобів, що їм належать, поліцейським та медичним працівникам, а також ненадання військових транспортних засобів посадовим особам Військової служби правопорядку у Збройних Силах України у встановлених законом невідкладних випадках;</td>
                    <td>68 грн</td>
                </tr>
                <tr>
                    <td>125</td>
                    <td>Інші порушення правил дорожнього руху, крім передбачених статтями 121-128, частинами першою і другою статті 129, статтями 139 і 140 Кодексу України про адміністративні правопорушення;<br/><br/><i>Тягнуть за собою попередження.</i></td>
                    <td></td>
                </tr>
                <tr>
                    <td>126 ч.1</td>
                    <td>Керування транспортним засобом особою, яка не має при собі або не пред’явила у спосіб, який дає можливість поліцейському прочитати та зафіксувати дані, що містяться в посвідченні водія відповідної категорії, реєстраційному документі на транспортний засіб, а також полісі (договорі) обов’язкового страхування цивільно-правової відповідальності власників наземних транспортних засобів (страхового сертифіката "Зелена картка"), або не пред’явила електронне посвідчення водія та електронне свідоцтво про реєстрацію транспортного засобу, чинний внутрішній електронний договір зазначеного виду обов’язкового страхування у візуальній формі страхового поліса, а також інших документів, передбачених законодавством;</td>
                    <td>425 грн</td>
                </tr>
                <tr>
                    <td>126 ч.2</td>
                    <td>Керування транспортним засобом особою, яка не має права керування таким транспортним засобом, або передача керування транспортним засобом особі, яка не має права керування таким транспортним засобом;<br/><br/><i>Примітка: Положення частин першої та другої цієї статті не застосовуються до осіб, які у встановленому порядку навчаються водінню транспортного засобу.</i></td>
                    <td>3400 грн</td>
                </tr>
                <tr>
                    <td>126 ч.3</td>
                    <td>Керування транспортним засобом особою, стосовно якої встановлено тимчасове обмеження у праві керування транспортними засобами;<br/><br/><i>Позбавлення права керування транспортними засобами на строк від трьох до шести місяців.</i></td>
                    <td></td>
                </tr>
                <tr>
                    <td>126 ч.4</td>
                    <td>Керування транспортним засобом особою, позбавленою права керування транспортними засобами;</td>
                    <td>20400 грн</td>
                </tr>
                <tr>
                    <td>126 ч.5</td>
                    <td>Повторне протягом року вчинення порушень, передбачених частинами другою – четвертою статті 126;<br/>
                        <br></br>* <i>Штраф з позбавленням права керування транспортним засобом на строк від п’яти до семи років та з оплатним вилученням транспортного засобу чи без такого.</i></td>
                    <td>40800 грн</td>
                </tr>
                <tr>
                    <td>127 ч.1</td>
                    <td>Непокора пішоходів сигналам регулювання дорожнього руху, перехід ними проїзної частини у невстановлених місцях або безпосередньо перед транспортними засобами, що наближаються, невиконання інших правил дорожнього руху;</td>
                    <td>255 грн</td>
                </tr>
                <tr>
                    <td>127 ч.2</td>
                    <td>Порушення Правил дорожнього руху особами, які керують велосипедами, гужовим транспортом, і погоничами тварин;</td>
                    <td>340 грн.</td>
                </tr>
                <tr>
                    <td>127 ч.3</td>
                    <td>Ті самі порушення, вчинені особами, зазначеними в частинах першій або другій цієї статті, які перебувають у стані сп'яніння;</td>
                    <td>680 грн.</td>
                </tr>
                <tr>
                    <td>127 ч.4</td>
                    <td>Порушення, передбачені частиною першою або другою цієї статті, що спричинили створення аварійної обстановки;</td>
                    <td>850 грн.</td>
                </tr>
                <tr>
                    <td>128<sup>1</sup> ч.1</td>
                    <td>Порушення або невиконання правил, норм і стандартів, що стосуються забезпечення безпеки дорожнього руху, на підприємствах, в установах та організаціях усіх форм власності під час виготовлення та ремонту транспортних засобів і деталей до них або встановлення на них інших предметів додаткового обладнання, не передбаченого конструкцією транспортного засобу, а також під час будівництва, реконструкції, ремонту та утримання автомобільних доріг, вулиць, залізничних переїздів і дорожніх споруд;</td>
                    <td>1700 грн.</td>
                </tr>
                <tr>
                    <td>128<sup>1</sup> ч.2</td>
                    <td>Порушення, передбачені частиною першою цієї статті, що спричинили пошкодження транспортних засобів, вантажів, автомобільних доріг, вулиць, залізничних переїздів, дорожніх споруд чи іншого майна;</td>
                    <td>2550 грн.</td>
                </tr>
                <tr>
                    <td>130 ч.1</td>
                    <td>Керування транспортними засобами особами в стані алкогольного, наркотичного чи іншого сп'яніння або під впливом лікарських препаратів, що знижують їх увагу та швидкість реакції, а також передача керування транспортним засобом особі, яка перебуває в стані такого сп'яніння чи під впливом таких лікарських препаратів, а так само відмова особи, яка керує транспортним засобом, від проходження відповідно до встановленого порядку огляду на стан алкогольного, наркотичного чи іншого сп'яніння або щодо вживання лікарських препаратів, що знижують увагу та швидкість реакції;
                        <br></br>* <i>Тягнуть за собою накладення штрафу на водіїв з позбавленням права керування транспортними засобами на строк один рік і на інших осіб - накладення штрафу.</i></td>
                    <td>17000 грн.</td>
                </tr>
                <tr>
                    <td>130 ч.2</td>
                    <td>Повторне протягом року вчинення будь-якого з порушень, передбачених частиною першою статті 130 – * тягне за собою накладення штрафу (або адміністративний арешт на строк десять діб) на водіїв з позбавленням права керування транспортними засобами на строк три роки та з оплатним вилученням транспортного засобу чи без такого, і на інших осіб – накладення штрафу (або адміністративний арешт на строк десять діб) з оплатним вилученням транспортного засобу чи без такого.</td>
                    <td>34000 грн</td>
                </tr>
                <tr>
                    <td>130 ч.3</td>
                    <td>Дії, передбачені частиною першою статті 130, вчинені особою, яка двічі протягом року піддавалась адміністративному стягненню за керування транспортними засобами у стані алкогольного, наркотичного чи іншого сп'яніння або під впливом лікарських препаратів, що знижують їх увагу та швидкість реакції, за відмову від проходження відповідно до встановленого порядку огляду на стан алкогольного, наркотичного чи іншого сп'яніння або щодо вживання лікарських препаратів, що знижують увагу та швидкість реакції –
                        <br></br>* <i>Тягнуть за собою накладення штрафу (або адміністративний арешт на строк п’ятнадцять діб) на водіїв з позбавленням права керування транспортними засобами на строк десять років та з конфіскацією транспортного засобу, який є у приватній власності порушника і на інших осіб - накладення штрафу (або адміністративний арешт на строк п’ятнадцять діб) та з конфіскацією транспортного засобу, який є у приватній власності порушника.</i></td>
                    <td>51000 грн</td>
                </tr>
                <tr>
                    <td>130 ч.4</td>
                    <td>Вживання водієм транспортного засобу після дорожньо-транспортної пригоди за його участю алкоголю, наркотиків, а також лікарських препаратів, виготовлених на їх основі (крім тих, що входять до офіційно затвердженого складу аптечки або призначені медичним працівником), або після того, як транспортний засіб був зупинений на вимогу поліцейського, до проведення уповноваженою особою медичного огляду з метою встановлення стану алкогольного, наркотичного чи іншого сп'яніння або щодо вживання лікарських препаратів, що знижують його увагу та швидкість реакції, чи до прийняття рішення про звільнення від проведення такого огляду –
                        <br></br>* <i>Тягне за собою накладення штрафу на водіїв або адміністративний арешт на строк п’ятнадцять діб, з позбавленням права керування транспортними засобами на строк три роки.</i></td>
                    <td>51000 грн</td>
                </tr>
                <tr>
                    <td>132<sup>1</sup></td>
                    <td>Порушення правил дорожнього перевезення небезпечних вантажів, правил проїзду великогабаритних і великовагових транспортних засобів автомобільними дорогами, вулицями або залізничними переїздами;
                        <br></br>* <i>Штраф для водіїв: 510 грн, для відповідальних посадових осіб: 680 грн.</i></td>
                    <td>510 грн</td>
                </tr>
                <tr>
                    <td>133<sup>1</sup> ч.1</td>
                    <td>Здійснення регулярних перевезень пасажирів на постійних маршрутах без укладення договору на перевезення пасажирів автомобільним транспортом або без паспорта маршруту;</td>
                    <td>510 грн</td>
                </tr>
                <tr>
                    <td>133<sup>1</sup> ч.2</td>
                    <td>Порушення правил надання послуг з перевезення організованих груп дітей або туристів;
                        <br></br>* <i>Штраф для водіїв: 595 грн, для посадових осіб: 680 грн.</i></td>
                    <td>595 грн</td>
                </tr>
                <tr>
                    <td>133<sup>1</sup> ч.3</td>
                    <td>Відхилення від визначеного маршруту руху автобуса або маршрутного таксомотора, незаїзд на автостанцію (автовокзал), якщо такий заїзд передбачений розкладом руху автобуса або маршрутного таксомотора;</td>
                    <td>34 грн.</td>
                </tr>
                <tr>
                    <td>133<sup>1</sup> ч.4</td>
                    <td>Здійснення перевезень пасажирів таксі, в яких не встановлено або не працює таксометр;</td>
                    <td>51 грн</td>
                </tr>
                <tr>
                    <td>133<sup>1</sup> ч.5</td>
                    <td>Перевезення пасажирів чи вантажів водієм, який не пройшов щозмінного передрейсового медичного огляду водіїв транспортних засобів, або перевезення без проведення передрейсового контролю технічного стану транспортних засобів;</td>
                    <td>510 грн.</td>
                </tr>
                <tr>
                    <td>133<sup>2</sup></td>
                    <td>Здійснення внутрішніх автомобільних перевезень пасажирів і вантажів на території України транспортними засобами, зареєстрованими в інших державах, або міжнародних двосторонніх чи транзитних перевезень пасажирів і вантажів без відповідного дозволу, а також порушення особливих умов і правил, зазначених у ліцензії на здійснення міжнародних автомобільних перевезень пасажирів і вантажів;</td>
                    <td>340 грн - 1700 грн</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default FinesTable;