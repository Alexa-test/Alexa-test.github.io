// js/law.js — Документы и юр. помощь
function getDocId(text) {
    const normalized = text.trim().toLowerCase()
        .replace(/\(.*?\)/g, '')  // убираем скобки
        .replace(/«|»/g, '')       // кавычки
        .trim();

    // Существующие из socvyplaty, health, work
    if (normalized.includes('паспорт') || normalized.includes('временное удостоверение')) return 'passport';
    if (normalized.includes('регистрация по месту жительства')) return 'registration';
    if (normalized.includes('участия в специальной военной операции') || normalized.includes('участии в сво')) return 'svo_participation';
    if (normalized.includes('выписка из приказа об увольнении')) return 'dismissal_order';
    if (normalized.includes('реквизиты карты «мир»') || normalized.includes('карты мир')) return 'mir_card';
    if (normalized.includes('согласие на обработку персональных данных')) return 'consent_personal';
    if (normalized.includes('справка о ранении') || normalized.includes('увечье')) return 'injury_cert';
    if (normalized.includes('чек на топливо')) return 'fuel_check';
    if (normalized.includes('отсутствии центрального отопления')) return 'no_central_heating';
    if (normalized.includes('балонного газа') || normalized.includes('емкостным сжиженным газом')) return 'gas_heating';
    if (normalized.includes('свидетельство о браке') || normalized.includes('рождении')) return 'family_proof';
    if (normalized.includes('фото 3×4')) return 'photo_3x4';
    if (normalized.includes('справка об обучении')) return 'study_cert';
    if (normalized.includes('заявление по форме')) return 'statement_form';
    if (normalized.includes('полис обязательного медицинского страхования')) return 'oms_policy';
    if (normalized.includes('удостоверение участника боевых действий')) return 'veteran_cert';
    if (normalized.includes('направление лечащего врача')) return 'doctor_referral';
    if (normalized.includes('справка о наличии медицинских показаний')) return 'medical_indication_cert';
    if (normalized.includes('заявление о предоставлении гранта')) return 'grant_application';
    if (normalized.includes('информация о проекте')) return 'project_info';
    if (normalized.includes('презентация деятельности')) return 'presentation';
    if (normalized.includes('документ о прохождении обучения')) return 'training_cert';
    if (normalized.includes('копия удостоверения ветерана')) return 'veteran_copy';
    if (normalized.includes('копия справки о участии в сво')) return 'svo_copy';
    if (normalized.includes('копия свидетельства о браке')) return 'marriage_cert_copy';
    if (normalized.includes('документы, подтверждающие его нахождение на военной службе')) return 'military_service_docs';
    if (normalized.includes('документ об образовании')) return 'education_doc';
    if (normalized.includes('документ о квалификации')) return 'qualification_doc';

    // Новые для law (из Excel: заявление, документ удостоверяющий личность и т.д.)
    if (normalized.includes('заявление')) return 'application';
    if (normalized.includes('документ, удостоверяющий личность')) return 'identity_doc';
    if (normalized.includes('справка об участии в сво')) return 'svo_cert';
    if (normalized.includes('удостоверение участника боевых действий')) return 'combat_veteran_cert';
    if (normalized.includes('документы, подтверждающие статус')) return 'status_docs';

    return null;
}

document.addEventListener('DOMContentLoaded', function () {
    const mainView = document.getElementById('mainView');
    const payoutsListContainer = document.getElementById('payoutsList');
    const lawIcon = document.querySelector('.icon-block[data-id="law"]');

    // Данные выплат (меры по юридической помощи из Excel)
    const payouts = [
        {
            title: "Бесплатная юридическая помощь",
            amount: " ",
            desc: "Правовое консультирование, составление заявлений, жалоб, ходатайств и других документов правового характера, представление интересов гражданина в судах, государственных и муниципальных органах, организациях в случаях и в порядке, установленных законодательством, адвокатами, участвующими в государственной системе бесплатной юридической помощи. Предоставляется независимо от места проживания (пребывания): гражданам принимающим (принимавшим) участие в СВО и (или) выполняющим (выполнявшим) задачи по отражению вооруженного вторжения на территорию РФ, в ходе вооруженной провокации на Государственной границе РФ и приграничных территориях субъектов РФ, прилегающих к районам проведения СВО...",
            checklist: [
                "Заявление",
                "Паспорт гражданина РФ или иной документ, удостоверяющий личность и подтверждающий гражданство РФ, возраст и проживание в Ленинградской области, в том числе до прекращения регистрации по месту жительства в Ленинградской области",
                "Документы, подтверждающие отнесение к категории лиц, имеющих право на получение бесплатной юридической помощи"
            ],
            link: "-",
            linkText: "На портал",
            mfcLink: "-",
            mfcText: "На Госуслугах"
        },
        {
            title: "Нотариальные действия без взимания платы",
            amount: " ",
            desc: "Нотариальные действия, совершаемые в отношении участников специальной военной операции и членов их семей, без взимания нотариального тарифа. Предоставляется участникам СВО и членам их семей.",
            checklist: [
                "Заявление",
                "Документы, удостоверяющие личность",
                "Документы, подтверждающие статус участника СВО или члена семьи",
                "Документы для нотариального действия (зависит от типа: завещание, доверенность и т.д.)"
            ],
            link: "https://notariat.ru",
            linkText: "В нотариальную контору",
            mfcLink: "-",
            mfcText: "На Госуслугах"
        },
        {
            title: "Юридическая помощь в военной прокуратуре",
            amount: " ",
            desc: "Оказание юридической помощи в военной прокуратуре по вопросам, связанным с военной службой, СВО и правами участников. Предоставляется участникам СВО и их семьям.",
            checklist: [
                "Заявление",
                "Документы, удостоверяющие личность",
                "Документы, подтверждающие статус",
                "Описание проблемы (жалоба, вопрос)"
            ],
            link: "https://gvp.gov.ru",
            linkText: "В военную прокуратуру",
            mfcLink: "-",
            mfcText: "На Госуслугах"
        },
        {
            title: "Бесплатная юридическая помощь в адвокатской палате",
            amount: " ",
            desc: "Бесплатная юридическая помощь в адвокатской палате Ленинградской области. Предоставляется участникам СВО и членам их семей.",
            checklist: [
                "Заявление",
                "Документы, удостоверяющие личность",
                "Документы, подтверждающие статус участника СВО или члена семьи",
                "Документы по делу (если применимо)"
            ],
            link: "https://aplo.ru",
            linkText: "В адвокатскую палату",
            mfcLink: "-",
            mfcText: "На Госуслугах"
        }
    ];

    // Стрелка назад
    function getBackArrow() {
        return `
            <div class="back-arrow-circle" onclick="goBackToMain()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
        `;
    }

    // Рендер списка выплат
    function renderPayouts() {
        let html = `
            <div class="container payouts-list position-relative py-5">
                ${getBackArrow()}
                <h2 class="text-center mb-5 fw-bold text-primary">Документы и юр. помощь</h2>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        `;

        payouts.forEach((payout, index) => {
            html += `
                <div class="payout-card" data-index="${index}" onclick="showChecklist(${index})">
                    <div class="payout-title">${payout.title}</div>
                    <div class="payout-amount">${payout.amount}</div>
                    <p class="text-muted mt-2">${payout.desc.substring(0, 150)}...</p>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        payoutsListContainer.innerHTML = html;
    }

    // Показ чеклиста
    window.showChecklist = function (index) {
        const payout = payouts[index];
        const checklistId = `checklist-law-${index}`;
        const saved = JSON.parse(localStorage.getItem(checklistId) || '[]');
        const total = payout.checklist.length;
        const done = saved.length;
        const percent = Math.round((done / total) * 100);

        let html = `
            <div class="container checklist-view position-relative">
                ${getBackArrow()}
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="card border-0 shadow-sm">
                            <div class="card-body">
                                <h4 class="card-title text-primary mb-4">${payout.title}</h4>

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
            const id = `cb-law-${index}-${i}`;
            html += `
                <li class="list-group-item d-flex align-items-center py-3">
                    <div class="form-check">
                        <input class="form-check-input checklist-cb" type="checkbox" 
                               id="${id}" ${checked} data-index="${i}" data-payout="${index}" data-doc-id="${getDocId(item)}">
                        <label class="form-check-label" for="${id}">${item}</label>
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
                                        Назад к списку
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        payoutsListContainer.innerHTML = html;
        addCheckboxListeners();
        payoutsListContainer.querySelector('.checklist-view').classList.add('show');
    };

    // Чекбоксы listeners
    function addCheckboxListeners() {
        document.querySelectorAll('.checklist-cb').forEach(cb => {
            cb.addEventListener('change', function () {
                const payoutIdx = this.dataset.payout;
                const itemIdx = this.dataset.index;
                const key = `checklist-law-${payoutIdx}`;
                let saved = JSON.parse(localStorage.getItem(key) || '[]');
                if (this.checked) {
                    if (!saved.includes(+itemIdx)) saved.push(+itemIdx);
                } else {
                    saved = saved.filter(x => x !== +itemIdx);
                }
                localStorage.setItem(key, JSON.stringify(saved));

                const total = payouts[payoutIdx].checklist.length;
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
    }

    // Клик по иконке
    if (lawIcon) {
        lawIcon.addEventListener('click', () => {
            renderPayouts();
            mainView.style.display = 'none';
            document.body.style.background = '#f8f9fa';
            setTimeout(() => payoutsListContainer.querySelector('.payouts-list').classList.add('show'), 50);
        });
    }

    // Назад к главному
    window.goBackToMain = function () {
        const currentView = payoutsListContainer.querySelector('.payouts-list, .checklist-view');
        if (currentView) {
            currentView.classList.remove('show');
            setTimeout(() => {
                payoutsListContainer.innerHTML = '';
                mainView.style.display = 'block';
                document.body.style.background = '';
            }, 300);
        }
    };

    // Назад к списку выплат
    window.goBackToPayouts = function () {
        renderPayouts();
        setTimeout(() => payoutsListContainer.querySelector('.payouts-list').classList.add('show'), 50);
    };
});
