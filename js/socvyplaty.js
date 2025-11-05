document.addEventListener('DOMContentLoaded', function () {
    const mainView = document.getElementById('mainView');
    const payoutsListContainer = document.getElementById('payoutsList');
    const rubIcon = document.getElementById('rubIcon');

    // === ДАННЫЕ ВЫПЛАТ + УПРОЩЁННЫЙ ЧЕКЛИСТ ===
    const payouts = [
        {
            title: "Единовременная выплата участникам СВО",
            amount: "30 000 ₽",
            desc: "Для военнослужащих, участвовавших в специальной военной операции.",
            checklist: [
                "Заявление (можно скачать на сайте или взять в МФЦ/Соцзащите)",
                "Паспорт (или военный билет, временное удостоверение)",
                "Реквизиты карты «Мир» (распечатка из банка или приложение)",
                "Справка, что участвовал в СВО (выдаёт воинская часть)",
                "Выписка из приказа об увольнении (если уволен)",
                "Подтверждение, что живёшь в Ленинградской области"
            ],
            link: "https://cszn.info/contact/structure",
            linkText: "Филиалы Соцзащиты",
            mfcLink: "https://mfc47.ru/declarant/info.php#532101",
            mfcText: "Подать в МФЦ"
        },
        {
            title: "Сертификат на зубопротезирование",
            amount: "60 500 ₽",
            desc: "При ранении в челюсть — до 500 000 ₽",
            checklist: [
                "Заявление",
                "Паспорт",
                "Справка о ранении",
                "Подтверждение, что живёшь в Лен. области"
            ],
            link: "https://cszn.info/contact/structure",
            linkText: "Филиалы Соцзащиты",
            mfcLink: "https://mfc47.ru/declarant/info.php#532101",
            mfcText: "Подать в МФЦ"
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
    window.showChecklist = function (index) {
        const payout = payouts[index];
        const checklistId = `checklist-${index}`;
        const saved = JSON.parse(localStorage.getItem(checklistId) || '[]');

        let html = `
            <div class="container checklist-view">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="card border-0 shadow-sm">
                            <div class="card-body">
                                <h4 class="card-title text-primary mb-4">
                                    ${payout.title}
                                </h4>
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

        // Обработчики чекбоксов
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