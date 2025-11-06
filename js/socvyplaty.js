document.addEventListener('DOMContentLoaded', function () {
    const mainView = document.getElementById('mainView');
    const payoutsListContainer = document.getElementById('payoutsList');
    const rubIcon = document.getElementById('rubIcon');

    // === ДАННЫЕ ВЫПЛАТ + УПРОЩЁННЫЙ ЧЕКЛИСТ ===
    // const payouts = [
    //     {
    //         title: "Единовременная выплата участникам СВО",
    //         amount: "30 000 ₽",
    //         desc: "Для военнослужащих, участвовавших в специальной военной операции.",
    //         checklist: [
    //             "Заявление (можно скачать на сайте или взять в МФЦ/Соцзащите)",
    //             "Паспорт (или временное удостоверение)",
    //             "Реквизиты карты «Мир» (распечатка из банка или приложение)",
    //             "Справка, что участвовал в СВО (выдаёт воинская часть)",
    //             "Выписка из приказа об увольнении (если уволен)",
    //             "Подтверждение, что живёшь в Ленинградской области"
    //         ],
    //         link: "https://cszn.info/contact/structure",
    //         linkText: "Филиалы Соцзащиты",
    //         mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    //         mfcText: "Подать в МФЦ"
    //     },
    //     {
    //         title: "Сертификат на зубопротезирование",
    //         amount: "60 500 ₽",
    //         desc: "При ранении в челюсть — до 500 000 ₽",
    //         checklist: [
    //             "Заявление",
    //             "Паспорт",
    //             "Справка о ранении",
    //             "Подтверждение, что живёшь в Лен. области"
    //         ],
    //         link: "https://cszn.info/contact/structure",
    //         linkText: "Филиалы Соцзащиты",
    //         mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    //         mfcText: "Подать в МФЦ"
    //     }
    // ];

    // === 12 МЕР ПОДДЕРЖКИ — ПРОСТО И ЯСНО ===
    const payouts = [
        {
    title: "Единовременная выплата участникам СВО",
    amount: "30 000 ₽",
    desc: "Уволенным участникам СВО, имеющим место жительства или место пребывания на территории Ленинградской области.",
    checklist: [
      "Заявление",
      "Паспорт или временное удостоверение",
      "Регистрация по месту жительства в Лен.Области",
      "Справка о подтверждении факта участия в специальной военной операции",
      "Выписка из приказа об увольнении с военной службы",
      "Реквизиты карты «Мир»"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  },
  {
    title: "Компенсация ЖКХ 50%",
    amount: "50% от всех счетов за жильё и коммуналку",
    desc: "Ежемесячная денежная компенсация части расходов на оплату жилого помещения и коммунальных услуг участникам СВО и их семьям.",
    checklist: [
      "Заявление(потребуются сведения о СНИЛС, ИНН, месте проживания заявителя и членов семьи",
      "Согласие на обработку персональных данных",
      "Паспорт",
      "Справка о подтверждении факта участия в специальной военной операции",
      "Реквизиты карты «Мир»"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  },
  {
    title: "Льготный проезд (ЕСПБ)",
    amount: "475 ₽/мес — автобус, метро",
    desc: "Льготный проезд на общественном транспорте по Лен. Области и СПб членам семей участников СВО.",
    checklist: [
      "Заявление(потребуются для заполнения данные СНИЛС и сведения подтверждающие родство с участником СВО)",
      "Регистрация по месту жительства в Лен.Области",
      "Согласие на обработку персональных данных",
      "Паспорт",
      "Справка о подтверждении факта участия в СВО",
      "Свидетельство о браке(для супруги) / рождении ребенка(для детей) или участника СВО(для родителей)",
      "Фото 3×4 (1 шт)",
      "Справка об обучении ребенка (детей), (пасынков и падчериц) в возрасте от 18 до 23 лет по очной форме обучения"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  },
  {
    title: "Выплата при ранении",
    amount: "500 000 ₽; 750 000 ₽ (2-3 группа инвалидности); 1 000 000 ₽ (1 группа)",
    desc: "Единовременная денежная выплата участникам специальной военной операции, получившим увечье (ранение, контузию, травму) в ходе специальной военной операции.",
    checklist: [
      "Заявление по форме https://cszn.info/Files/file/ranenie_zayavlenie.docx",
      "Согласие на обработку персональных данных по форме https://cszn.info/Files/file/soglasie_kontuziya_i_gibel.docx",
      "Паспорт",
      "Справка о ранении, полученного при выполнении задач в ходе СВО",
      "Справка о подтверждении факта участия в специальной военной операции",
      "Реквизиты карты «Мир»"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  },
  {
    title: "Компенсация топлива",
    amount: "50% от стоимости топлива и газа + доставка",
    desc: "Раз в год. Для домов без центрального отопления. Денежная компенсация части расходов на приобретение топлива и(или) балонного газа и транспортных услуг по их доставке участникам специальной военной операции и членам их семей.",
    checklist: [
      "Заявление",
      "Согласие на обработку персональных данных",
      "Паспорт",
      "Справка о подтверждении факта участия в СВО",
      "Чек на топливо",
      "Документ об отсутствии центрального отопления и газоснабжения",
      "Документ об отоплении жилого помещения емкостным сжиженным газом (при отоплении жилого помещения емкостным сжиженным газом)"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  },
  {
    title: "Подключение газа",
    amount: "До 99 470,6 ₽ (по факту)",
    desc: "Единовременная денежная компенсация отдельным категориям граждан, проживающим на территории Ленинградской области, в целях возмещения расходов на подключение (технологическое присоединение) индивидуальных домовладений к сети газораспределения",
    checklist: [
      "Заявление",
      "Согласие на обработку персональных данных",
      "Паспорт или временное удостоверение",
      "Копия договора между гражданином и газораспределительной организацией ЛО, заверенную печатью (при наличии) и подписью руководителя",
      "Акт о подключении по форме https://cszn.info/Files/file/akt.docx",
      "Чек, подтверждающий расходы",
      "Документы удостоверяющие социальную категорию(военнослужащий - справка об участии в СВО, членам семьи погибших - удостоверение)"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  },
  {
    title: "Льготный Ж/д проезд детям",
    amount: "Оплата 10% от стоимости тарифа",
    desc: "Льготный проезд на железнодорожном транспорте пригородного сообщения детям, пасынкам и падчерицам участников СВО",
    checklist: [
      "Заявление по форме https://cszn.info/Files/file/espb_zayavlenie_1.docx",
      "Паспорт родителя",
      "Свидетельство о рождении",
      "Справка о службе отца",
      "Регистрация по месту жительства в Лен.Области",
      "Справка об очной форме обучения(если возраст от 18 до 23 лет)"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  },
  {
    title: "Пособие беременным жёнам",
    amount: "42 665 ₽ (разово) + 10 341 ₽/мес",
    desc: "Ежемесячная денежная выплата и единовременное пособие беременным женам участников специальной военной операции (беременность от 180 дней).",
    checklist: [
      "Заявление",
      "Согласие на обработку персональных данных по форме https://cszn.info/Files/file/soglasie_na_obrab_pers_d.docx",
      "Паспорт",
      "Регистрация по месту жительства в Лен.Области",
      "Справка о постановке на учет в медицинской организации в связи с беременностью и предполагаемой дате родов",
      "Свидетельство о браке",
      "Справка о службе мужа в зоне СВО",
      "Реквизиты карты «Мир»"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  },

  {
    title: "Деньги вместо земли",
    amount: "419 600 ₽",
    desc: "Единовременная денежная выплата взамен предоставления земельного участка в собственность бесплатно",
    checklist: [
      "Заявление",
      "Паспорт или временное удостоверение",
      "Земельный сертификат(оригинал)",
      "Реквизиты карты «Мир»"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  },
  {
    title: "Сертификат на зубопротезирование участникам СВО",
    amount: "60 500 ₽, при ранении в челюсть до 500 000 ₽",
    desc: "Мера социальной поддержки по проведению зубопротезирования (кроме расходов на оплату стоимости драгоценных металлов) участникам СВО",
    checklist: [
      "Заявление",
      "Паспорт",
      "Справка о подтверждении факта участия в специальной военной операции",
      "Справка от стоматолога(ФИО, дата рождения, сведения о нуждаемости в зубопротезировании, дата выдачи, подпись и личная печать врача, штамп медицинской организации)",
      "Выписка об увольнении с военной службы",
      "Документ, подтверждающий факт получения участником СВО увечья (ранения, контузии, травмы) посредством ранения в челюстно-лицевую область в ходе проведения СВО"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  },
    {
    title: "Ежемесячная выплата детям погибших",
    amount: "9 202,5 ₽/мес до 18 лет (до 23 — если учится)",
    desc: "Ежемесячная денежная выплата по потере кормильца детям граждан, погибших (умерших) вследствие выполнения задач в ходе специальной военной операции",
    checklist: [
      "Заявление",
      "Паспорт родителя",
      "Свидетельство о рождении",
      "Свидетельство о смерти",
      "Справка об очной форме обучения ребенка (если возраст 18-23 года)",
      "Реквизиты карты «Мир»"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  },
  {
    title: "Выплата семьям погибших",
    amount: "2 000 000 ₽",
    desc: "Родителям, жене, детям погибшего участника СВО.",
    checklist: [
      "Заявление",
      "Паспорт",
      "Свидетельство о смерти",
      "Свидетельство о браке / рождении",
      "Реквизиты карты «Мир»"
    ],
    link: "https://cszn.info/contact/structure",
    linkText: "В Соцзащиту",
    mfcLink: "https://mfc47.ru/declarant/info.php#532101",
    mfcText: "В МФЦ"
  }
];
    

    // === ГЕНЕРАЦИЯ СПИСКА ВЫПЛАТ ===
    function renderPayouts() {
        let html = `
            <div class="container payouts-list">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
        `;

        payouts.forEach((payout, index) => {
            html += `
                <div class="payout-card" data-index="${index}" onclick="showChecklist(${index})">
                    <div class="payout-title">
                        ${payout.title}
                    </div>
                    <div class="payout-amount">${payout.amount}</div>
                    <p class="text-muted mt-2">${payout.desc}</p>
                </div>
            `;
        });

        html += `
                        <button class="btn btn-outline-secondary back-btn" onclick="goBackToMain()">
                            Назад к иконке
                        </button>
                    </div>
                </div>
            </div>
        `;

        payoutsListContainer.innerHTML = html;
    }

    // === ЧЕКЛИСТ С ЧЕКБОКСАМИ + МФЦ ===
    // === ЧЕКЛИСТ С ЧЕКБОКСАМИ + ПРОГРЕСС-БАР ===
    window.showChecklist = function (index) {
    const payout = payouts[index];
    const checklistId = `checklist-${index}`;
    const saved = JSON.parse(localStorage.getItem(checklistId) || '[]');
    const total = payout.checklist.length;
    const done = saved.length;
    const percent = Math.round((done / total) * 100);

    let html = `
        <div class="container checklist-view">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <h4 class="card-title text-primary mb-4">
                                ${payout.title}
                            </h4>

                            <!-- ПРОГРЕСС-БАР -->
                            <div class="progress-container">
                                <div class="progress">
                                    <div class="progress-bar" style="width: ${percent}%"></div>
                                </div>
                                <div class="progress-text">
                                    ${done} из ${total} готово (${percent}%)
                                </div>
                            </div>

                            <h5 class="text-success mb-3">Что взять с собой:</h5>
                            <ul class="list-group list-group-flush">
    `;

    payout.checklist.forEach((item, i) => {
        const checked = saved.includes(i) ? 'checked' : '';
        const id = `cb-${index}-${i}`;
        html += `
            <li class="list-group-item d-flex align-items-center py-3">
                <div class="form-check">
                    <input class="form-check-input checklist-cb" type="checkbox" 
                           id="${id}" ${checked} data-index="${i}" data-payout="${index}">
                    <label class="form-check-label" for="${id}">
                        ${item}
                    </label>
                </div>
            </li>
        `;
    });

    html += `
                            </ul>
                            <div class="mt-4 d-flex flex-wrap gap-2">
                                <a href="${payout.link}" target="_blank" class="btn btn-outline-primary">
                                    ${payout.linkText}
                                </a>
                                <a href="${payout.mfcLink}" target="_blank" class="btn btn-success">
                                    ${payout.mfcText}
                                </a>
                                <button class="btn btn-outline-secondary" onclick="goBackToPayouts()">
                                    Назад
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    payoutsListContainer.innerHTML = html;

    // === ОБНОВЛЕНИЕ ПРОГРЕССА ПРИ КЛИКЕ ===
    document.querySelectorAll('.checklist-cb').forEach(cb => {
        cb.addEventListener('change', function () {
            const payoutIdx = this.dataset.payout;
            const itemIdx = this.dataset.index;
            const key = `checklist-${payoutIdx}`;
            let saved = JSON.parse(localStorage.getItem(key) || '[]');
            if (this.checked) {
                if (!saved.includes(+itemIdx)) saved.push(+itemIdx);
            } else {
                saved = saved.filter(x => x !== +itemIdx);
            }
            localStorage.setItem(key, JSON.stringify(saved));

            // Перерисовываем прогресс
            const newDone = saved.length;
            const newPercent = Math.round((newDone / total) * 100);
            const bar = document.querySelector('.progress-bar');
            const text = document.querySelector('.progress-text');
            if (bar && text) {
                bar.style.width = `${newPercent}%`;
                text.textContent = `${newDone} из ${total} готово (${newPercent}%)`;
            }
        });
    });

    payoutsListContainer.querySelector('.checklist-view').classList.add('show');
};

    // === КЛИК ПО ИКОНКЕ ===
    rubIcon.addEventListener('click', function () {
        renderPayouts();
        mainView.style.display = 'none';
        payoutsListContainer.querySelector('.payouts-list').classList.add('show');
        document.body.style.background = '#f8f9fa';
    });

    // === НАЗАД К ИКОНКЕ ===
    window.goBackToMain = function () {
        const currentView = payoutsListContainer.querySelector('.payouts-list, .checklist-view');
        if (currentView) {
            currentView.classList.remove('show');
            setTimeout(() => {
                mainView.style.display = 'block';
                document.body.style.background = 'var(--bg)';
                payoutsListContainer.innerHTML = '';
            }, 300);
        }
    };

    // === НАЗАД К СПИСКУ ===
    window.goBackToPayouts = function () {
        renderPayouts();
        payoutsListContainer.querySelector('.payouts-list').classList.add('show');
    };

    // Плавность
    payoutsListContainer.addEventListener('transitionend', () => {
        const active = payoutsListContainer.querySelector('.show');
        if (active) active.style.overflow = 'visible';
    });
});