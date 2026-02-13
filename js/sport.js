// js/sport.js — Спорт
function getDocId(text) {
    const normalized = text.trim().toLowerCase()
        .replace(/\(.*?\)/g, '')  // убираем скобки
        .replace(/«|»/g, '')       // кавычки
        .trim();

    // Существующие из предыдущих скриптов
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
    if (normalized.includes('заявление')) return 'application';
    if (normalized.includes('документ, удостоверяющий личность')) return 'identity_doc';
    if (normalized.includes('справка об участии в сво')) return 'svo_cert';
    if (normalized.includes('удостоверение участника боевых действий')) return 'combat_veteran_cert';
    if (normalized.includes('документы, подтверждающие статус')) return 'status_docs';
    if (normalized.includes('свидетельство о рождении')) return 'birth_cert';
    if (normalized.includes('паспорт рф ребёнка')) return 'child_passport';
    if (normalized.includes('документ, удостоверяющий личность законного представителя')) return 'representative_identity';
    if (normalized.includes('документ, подтверждающий полномочия законного представителя')) return 'representative_powers';
    if (normalized.includes('снилс ребёнка')) return 'snils_child';
    if (normalized.includes('документы, подтверждающие право на льготу')) return 'benefit_docs';
    if (normalized.includes('справку из военкомата или воинской части')) return 'military_comissariat_cert';
    if (normalized.includes('контракт о прохождении военной службы')) return 'military_contract';
    if (normalized.includes('документ, подтверждающий получение основного общего образования')) return 'basic_education_doc';
    if (normalized.includes('копию документа, подтверждающего родство')) return 'kinship_doc_copy';

    // Новые для sport (из Excel: документ удостоверяющий личность, справка о подтверждении участия в СВО, документ о родстве)
    if (normalized.includes('документ, удостоверяющий личность')) return 'identity_doc';
    if (normalized.includes('справка о подтверждении участия в сво')) return 'svo_participation';
    if (normalized.includes('документ о родстве')) return 'kinship_doc';

    return null;
}

document.addEventListener('DOMContentLoaded', function () {
    const mainView = document.getElementById('mainView');
    const payoutsListContainer = document.getElementById('payoutsList');
    const sportIcon = document.querySelector('.icon-block[data-id="sport"]');

    // Данные выплат (меры по спорту из Excel — в файле только "Программа «Плавание для всех»" из row66)
    const payouts = [
        {
            title: "Программа «Плавание для всех»",
            amount: " ",
            desc: "Проведение групповых занятий под руководством инструктора или тренера в соответствии с учебной программой «Плавание для всех», рассчитанной на 36 часов обучения и правилами оказания физкультурно-оздоровительных услуг. Предоставляется бесплатно гражданину РФ либо его законному представителю, постоянно или временно проживающему в Ленинградской области и являющемуся членом семьи участника специальной военной операции (СВО) в возрасте от 7 лет.",
            checklist: [
                "Документ, удостоверяющий личность",
                "Справка о подтверждении участия в СВО",
                "Документ о родстве (для членов семьи)"
            ],
            link: "https://sport.lenobl.ru/ru/plavanie-dlya-vseh/",
            linkText: "На сайте комитета по спорту",
            mfcLink: "-",
            mfcText: "Личное обращение"
        }
        // Если есть другие меры по спорту в файле, добавьте их сюда. В предоставленном Excel только эта мера явно связана со спортом.
        // Можно добавить связанные, если интерпретировать, но файл содержит только одну.
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
                <h2 class="text-center mb-5 fw-bold text-primary">Спорт</h2>
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
        const checklistId = `checklist-sport-${index}`;
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
            const id = `cb-sport-${index}-${i}`;
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
                const key = `checklist-sport-${payoutIdx}`;
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
    if (sportIcon) {
        sportIcon.addEventListener('click', () => {
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
