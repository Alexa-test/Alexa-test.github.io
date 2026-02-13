// js/work.js — Труд и занятость
function getDocId(text) {
    const normalized = text.trim().toLowerCase()
        .replace(/\(.*?\)/g, '')  // убираем скобки
        .replace(/«|»/g, '')       // кавычки
        .trim();

    // Простое сопоставление по ключевым словам (из socvyplaty и health)
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

    // Новые для work (из Excel)
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

    return null;
}

document.addEventListener('DOMContentLoaded', function () {
    const mainView = document.getElementById('mainView');
    const payoutsListContainer = document.getElementById('payoutsList');
    const workIcon = document.querySelector('.icon-block[data-id="work"]');

    // Данные выплат (меры по труду и занятости из Excel)
    const payouts = [
        {
            title: "Грант на реализацию проекта по созданию (восстановлению, развитию) бизнеса",
            amount: "до 750 тыс. руб",
            desc: "Грант на реализацию проекта по созданию (восстановлению, развитию) бизнеса. Грант предоставляется при условии софинансирования получателем гранта расходов по проекту в размере не менее 25 процентов от размера общего объема расходов, предусмотренного на реализацию проекта.",
            checklist: [
                "Заявление о предоставлении гранта",
                "Информация о проекте",
                "Презентация деятельности участника отбора в форматах pdf или pptx",
                "Документ, подтверждающий прохождение соответствующего обучения или копия диплома о высшем экономическом образовании",
                "Копия удостоверения ветерана боевых действий или удостоверения члена семьи погибшего ветерана боевых действий",
                "Копия справки о подтверждении факта участия в специальной военной операции",
                "Копия свидетельства о браке (для членов семьи погибшего ветерана)"
            ],
            link: "https://msp.lenobl.ru/ru/deiatelnost/help/",
            linkText: "В комитет по развитию МСП",
            mfcLink: "https://www.gosuslugi.ru/fzo/measures/4661",
            mfcText: "На Госуслугах"
        },
        {
            title: "Приостановление обязательств по соглашению о предоставлении гранта на срок прохождения военной службы по мобилизации с последующим продлением сроков достижения результатов предоставления гранта",
            amount: "-",
            desc: "Приостановление обязательств по гранту. Получатель гранта, призванный на военную службу по мобилизации или проходящий военную службу по контракту, либо лицо, уполномоченное представлять его интересы, направляет в комитет информацию о мобилизации или прохождении военной службы по контракту получателя гранта любым доступным способом.",
            checklist: [
                "Документы, подтверждающие его нахождение в период действия соглашения на военной службе по мобилизации или действие контракта о прохождении военной службы"
            ],
            link: "https://msp.lenobl.ru/ru/o-komitete/",
            linkText: "В комитет по развитию МСП",
            mfcLink: "https://www.gosuslugi.ru/military/measures/5155",
            mfcText: "На Госуслугах"
        },
        {
            title: "Предоставление льготных микрозаймов участникам специальной военной операции на развитие бизнеса (Zа Наших)",
            amount: "до 3 млн. руб, на 36 мес. под 1% годовых",
            desc: "Предоставление льготных микрозаймов. Предоставление льготных микрозаймов: для индивидуальными предпринимателями – участниками специальной военной операции или вдовой (вдовцом) участника специальной военной операции или обществами с ограниченной ответственностью, в которых единственный участник, одновременно являющийся единоличным исполнительным органом.",
            checklist: [
                "Заявление на предоставление микрозайма",
                "Документы, подтверждающие статус участника СВО",
                "Документы о бизнесе (регистрация ИП/ООО, финансовые отчёты)"
            ],
            link: "https://mkk.813.ru/mikrofinansovye-produkty/za-nashikh/",
            linkText: "В МКК ЛО",
            mfcLink: "https://www.gosuslugi.ru/fzo/measures/4663",
            mfcText: "На Госуслугах"
        },
        {
            title: "Предоставление льготных микрозаймов участникам специальной военной операции на развитие бизнеса (Беззалоговый)",
            amount: "до 1 млн. руб, на 36 мес. под 12,75% годовых",
            desc: "Предоставление льготных микрозаймов. Предоставление льготных микрозаймов: для индивидуальными предпринимателями – участниками специальной военной операции или вдовой (вдовцом) участника специальной военной операции или обществами с ограниченной ответственностью, в которых единственный участник, одновременно являющийся единоличным исполнительным органом.",
            checklist: [
                "Заявление на предоставление микрозайма",
                "Документы, подтверждающие статус участника СВО",
                "Документы о бизнесе (регистрация ИП/ООО, финансовые отчёты)"
            ],
            link: "https://mkk.813.ru/mikrofinansovye-produkty/bezzalogovyy/",
            linkText: "В МКК ЛО",
            mfcLink: "https://www.gosuslugi.ru/fzo/measures/4663",
            mfcText: "На Госуслугах"
        },
        {
            title: "Обучающая программа «Бизнес Героев 47» для участников СВО",
            amount: "-",
            desc: "Обучение предпринимательской деятельности.",
            checklist: [
                "Заявление на участие",
                "Документы, подтверждающие статус участника СВО"
            ],
            link: "https://813.ru/podderzhka/uchastnikam-svo/biznes-geroev-47/",
            linkText: "В Фонд поддержки предпринимательства",
            mfcLink: "https://www.gosuslugi.ru/fzo/measures/4664",
            mfcText: "На Госуслугах"
        },
        {
            title: "Содействие в трудоустройстве",
            amount: "-",
            desc: "Подбор вакансий. Обращение в ГКУ ЦЗН ЛО через Единую цифровую платформу в сфере занятости и трудовых отношений \"Работа России\".",
            checklist: [
                "Заявление + анкета"
            ],
            link: "-",
            linkText: "В службу занятости",
            mfcLink: "-",
            mfcText: "На портале \"Работа России\""
        },
        {
            title: "Профессиональное обучение и дополнительное профессиональное образование отдельных категорий граждан по направлению органов службы занятости населения",
            amount: "-",
            desc: "Обучение в целях приобретения ими профессиональных знаний, умений, навыков и формирования компетенций, необходимых для выполнения определенных трудовых, служебных функций, овладение которыми повышает конкурентоспособность на рынке труда и позволяет сохранить занятость либо увеличить возможности трудоустройства. Подать заявление и документы в органы службы занятости по месту жительства, Получить направление на обучение, Пройти обучение по образовательной программе в обучающей организации.",
            checklist: [
                "Заявление",
                "Документ, подтверждающий личность заявителя",
                "Документ об образовании или о квалификации — подлинник или нотариально заверенная копия",
                "Сведения (справку) о факте участия в специальной военной операции",
                "Документ, подтверждающий родственную связь — свидетельство о браке, о рождении",
                "Справку об обучении — для ребёнка в возрасте от 18 до 23 лет",
                "Документ, выданный уполномоченным органом либо организацией, подтверждающий факт нахождения заявителя на иждивении участника СВО — для лиц, находящихся на иждивении"
            ],
            link: "-",
            linkText: "В службу занятости",
            mfcLink: "-",
            mfcText: "Личное обращение"
        },
        {
            title: "Психологическая поддержка в сфере занятости и социальная адаптация на рынке труда участникам специальной военной операции и членам семей участников специальной военной операции",
            amount: "-",
            desc: "Повышение мотивации к труду и снижение барьеров, препятствующих поиску работы. Подать заявление и документы в органы службы занятости по месту жительства и получить меры поддержки.",
            checklist: [
                "Заявление",
                "Документ, подтверждающий личность заявителя",
                "Сведения (справку) о факте участия в СВО",
                "Документ, подтверждающий родственную связь: свидетельство о браке, свидетельство о рождении",
                "Документ, выданный уполномоченным органом либо организацией, подтверждающий факт нахождения заявителя на иждивении участника СВО — для лиц, находящихся на иждивении",
                "Документ, подтверждающий факт стационарного лечения (реабилитации) в медицинских организациях",
                "Документ, подтверждающий факт нахождения на реабилитации или обучении в Мультицентре"
            ],
            link: "-",
            linkText: "В службу занятости",
            mfcLink: "-",
            mfcText: "Личное обращение"
        }
    ];

    // Стрелка назад (как в health.js)
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
                <h2 class="text-center mb-5 fw-bold text-primary">Труд и занятость</h2>
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
        const checklistId = `checklist-work-${index}`;
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
            const id = `cb-work-${index}-${i}`;
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
                const key = `checklist-work-${payoutIdx}`;
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
    if (workIcon) {
        workIcon.addEventListener('click', () => {
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
