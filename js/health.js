// js/health.js — Здравоохранение
function getDocId(text) {
    const normalized = text.trim().toLowerCase()
        .replace(/\(.*?\)/g, '')  // убираем скобки
        .replace(/«|»/g, '')       // кавычки
        .trim();

    // Простое сопоставление по ключевым словам (можно улучшить)
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

    // Добавьте новые по мере необходимости из мер здоровья
    if (normalized.includes('полис обязательного медицинского страхования')) return 'oms_policy';
    if (normalized.includes('удостоверение участника боевых действий')) return 'veteran_cert';
    if (normalized.includes('направление лечащего врача')) return 'doctor_referral';
    if (normalized.includes('справка о наличии медицинских показаний')) return 'medical_indication_cert';

    return null;
}

document.addEventListener('DOMContentLoaded', function () {
    const mainView = document.getElementById('mainView');
    const payoutsListContainer = document.getElementById('payoutsList');
    const healthIcon = document.querySelector('.icon-block[data-id="health"]');

    // Данные выплат (меры по здоровью из Excel, очищенные)
    const payouts = [
        {
            title: "Индивидуальное сопровождение в получении услуг здравоохранения",
            amount: "",
            desc: "Индивидуальное сопровождение в медицинских учреждениях, подведомственных Комитету по здравоохранению Ленинградской области, при организации медицинской помощи, в том числе в амбулаторных условиях и в условиях стационара (первичная медико-санитарная медицинская помощь, специализированная медицинская помощь, реабилитация, паллиативная медицинская помощь, санаторно-курортное лечение) и лекарственной помощи от момента записи пациента на прием к врачу-специалисту медицинской организации до организации медицинской помощи, в том числе направления в федеральные медицинские организации  Предоставляется гражданам в медицинских учреждениях Ленинградской области оказывающих первичную медико-санитарную помощь прикрепленному населениюв амбулаторных условиях  и в стационарных условиях при госпитализации пациентов, в том числе для оказания специализированной медицинской помощи в плановой форме в первоочередном порядке; при медицинской реабилитации в специалиализированных отделениях в соответствии с маршрутизацией ( мобилизованные, добровольцы, военнослужащие, лица из организаций, содействующих СВО, члены семей мобидизованных, члены семей добровольцев, члены семей военнослужащих, члены семей лиц из организаций, содействующих СВО; ветераны СВО инвалиды СВО семьи погибших или умерших; защитники Донбасса)",
            checklist: [
                "Документ, удостоверяющий личность",
                "Полис обязательного медицинского страхования",
                "Удостоверение участника боевых действий/справка об участии в СВО",
                "Документ, подтвердающий статус члена участника СВО"
            ],
            link: "https://lenobl.ru/support",
            linkText: "В Соцзащиту",
            mfcLink: "https://www.gosuslugi.ru/military?okato=41000000000&regionId=29&recipient=0&directions=0&level=3&pageNum=10 https://www.gosuslugi.ru/fzo?okato=41000000000&regionId=29&recipient=0&directions=0&level=3&pageNum=6",
            mfcText: "В МФЦ"
        },
        {
            title: "Медицинская психологическая помощь",
            amount: "",
            desc: "Оказание бесплатной психологической помощи в первоочередном порядке в медицинских учреждениях, подведомственных Комитету по здравоохранению Ленинградской области, имеющих прикрепленное население для оказания первичной медико-санитарной помощи.  Предоставляется гражданам в медицинских учреждениях Ленинградской области, оказывающих первичную медико-санитарную помощь прикреплённому населению    ( мобилизованные, добровольцы, военнослужащие, лица из организаций, содействующих СВО, члены семей мобидизованных, члены семей добровольцев, члены семей военнослужащих, члены семей лиц из организаций, содействующих СВО; ветераны СВО инвалиды СВО семьи погибших или умерших; защитники Донбасса)",
            checklist: [
                "Документ, удостоверяющий личность",
                "Полис обязательного медицинского страхования"
            ],
            link: "https://lenobl.ru/support",
            linkText: "В Соцзащиту",
            mfcLink: "https://www.gosuslugi.ru/military?okato=41000000000&regionId=29&recipient=0&directions=0&level=3&pageNum=4 https://www.gosuslugi.ru/fzo?okato=41000000000&regionId=29&recipient=0&directions=0&level=3&pageNum=3",
            mfcText: "В МФЦ"
        },
        {
            title: "Медицинская реабилитация",
            amount: "",
            desc: "Направление на медицинскую реабилитацию при наличии медицинских показаний и отсутствии противопоказаний, установленных лечащим врачом,  для пациентов с нарушением функции центральной нервной системы,  для пациентов с нарушением функции нервной сисемы и костно-мышечной системы и для пациентов с соматическими заболеваниями Направление на медицинскую реабилитацию при наличии направления лечащего врача осуществляется в соответствии с маршрутизацией в срок до 14 рабочих дней",
            checklist: [
                "Документ, удостоверяющий личность",
                "Полис обязательного медицинского страхования",
                "Удостоверение участника боевых действий/справка об участии в СВО",
                "Документ, подтвердающий статус члена участника СВО",
                "Направление лечащего врача, согласованное решением врачебной комиссии медицинской организации"
            ],
            link: "https://lenobl.ru/support",
            linkText: "В Соцзащиту",
            mfcLink: "https://www.gosuslugi.ru/fzo?okato=41000000000&regionId=29&recipient=0&directions=0&level=3&pageNum=8",
            mfcText: "В МФЦ"
        },
        {
            title: "Санаторий для участников СВО",
            amount: "",
            desc: "Оказание государственной услуги в социальной сфере «санаторно-курортное лечение» в соответствии с социальным сертификатом с учетом требований Федерального закона № 189-ФЗ от 13.07.2020 «О государственном (муниципальном) социальном заказе на оказание государственных (муниципальных) услуг в социальной сфере» и постановления Правительства Ленинградской области от 14.09.2023 № 639 «Об организации оказания государственной услуги в социальной сфере «санаторно-курортное лечение» в рамках исполнения государственного социального заказа в соответствии с социальным сертификатом». Государственная услуга в социальной сфере оказывается по 4 профилям: соматические заболевания; нарушение функции центральной нервной системы; органы дыхания нетуберкулезного характера; система кровообращения. От обращения в медицинскую организацию до организации оказания медицинской помощи в соответствии с медицинскими показаниями.",
            checklist: [
                "Документ, удостоверяющий личность",
                "Полис обязательного медицинского страхования",
                "Удостоверение участника боевых действий/справка об участии в СВО"
            ],
            link: "-",
            linkText: "В Соцзащиту",
            mfcLink: "-",
            mfcText: "В МФЦ"
        },
        {
            title: "Психологическая поддержка в сфере занятости и социальная адаптация на рынке труда участникам специальной военной операции и членам семей участников специальной военной операции",
            amount: "",
            desc: "Повышение мотивации к труду и снижение барьеров, препятствующих поиску работы Подать заявление и документы в органы службы занятости по месту жительства и получить меры поддержки",
            checklist: [
                "Заявление",
                "Документ, подтверждающий личность заявителя",
                "Сведения  о факте участия в СВО",
                "Документ, подтверждающий родственную связь: свидетельство о браке, свидетельство о рождении",
                "Документ, выданный уполномоченным органом либо организацией, подтверждающий факт нахождения заявителя на иждивении участника СВО — для лиц, находящихся на иждивении",
                "Документ, подтверждающий факт стационарного лечения  в медицинских организациях Ленинградской области или в военно-медицинских организациях Санкт-Петербурга, расположенных на территории Ленинградской области и Санкт-Петербурга (для участников СВО, находящихся на стационарном лечении в соответствующих медицинских организациях)",
                "Документ, подтверждающий факт нахождения на реабилитации или обучении в Государственном автономном нетиповом профессиональном образовательном учреждении Ленинградской области \"Мультицентр социальной и трудовой интеграции\" (для участников СВО, находящихся в Государственном автономном нетиповом профессиональном образовательном учреждении Ленинградской области \"Мультицентр социальной и трудовой интеграции\")"
            ],
            link: "-",
            linkText: "В Соцзащиту",
            mfcLink: "-",
            mfcText: "В МФЦ"
        },
        {
            title: "Программа «Плавание для всех» ",
            amount: "",
            desc: "Проведение групповых занятий под руководством инструктора или тренера в соответствии с учебной программой «Плавание для всех», рассчитанной на 36 часов обучения и правилами оказания физкультурно-оздоровительных услуг.  Предоставляется бесплатно гражданину РФ либо его законному представителю, постоянно или временно проживающему в Ленинградской области и являющемуся членом семьи участника специальной военной операции (СВО) в возрасте от 7 лет",
            checklist: [
                "Документ, удостоверяющий личность",
                "Справка о подтверждении участия в СВО",
                "Документ о родстве (для членов семьи)"
            ],
            link: "-",
            linkText: "В Соцзащиту",
            mfcLink: "-",
            mfcText: "В МФЦ"
        },
    ];

    // Стрелка назад (как в tsr.js)
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
                <h2 class="text-center mb-5 fw-bold text-primary">Здравоохранение</h2>
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
        const checklistId = `checklist-health-${index}`;
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
            const id = `cb-health-${index}-${i}`;
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
                const key = `checklist-health-${payoutIdx}`;
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
    if (healthIcon) {
        healthIcon.addEventListener('click', () => {
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
