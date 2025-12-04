// js/health.js — меры поддержки в сфере здравоохранения
document.addEventListener('DOMContentLoaded', function () {
    const mainView = document.getElementById('mainView');
    const payoutsListContainer = document.getElementById('payoutsList');
    const healthIcon = document.querySelector('.icon-block[data-id="health"]');

    // === ДАННЫЕ МЕР ПОДДЕРЖКИ ===
    const measures = [
        {
            title: "Психологическая помощь",
            desc: "Предоставляется на базе кабинетов медико-психологического консультирования",
            org: "Комитет по здравоохранению Ленинградской области",
            address: "191124, Санкт-Петербург, ул. Лафонская, д. 6, лит. А",
            phone: "+7 (812) 679-60-04",
            email: "sec.lokz@lenreg.ru",
            type: "услуга"
        },
        {
            title: "Индивидуальное ведение родов + послеродовое сопровождение",
            desc: "Индивидуальное ведение родов на базе Перинатального центра ЛОКБ, послеродовое сопровождение и педиатрическое консультирование ребёнка в течение года после рождения",
            org: "Комитет по здравоохранению Ленинградской области",
            address: "191124, Санкт-Петербург, ул. Лафонская, д. 6, лит. А",
            phone: "+7 (812) 679-60-04",
            email: "sec.lokz@lenreg.ru",
            // note: "Мера организационного характера",
            type: "услуга"
        },
        {
            title: "Индивидуальное сопровождение в получении услуг здравоохранения",
            desc: "Сопровождение в медицинских учреждениях Ленинградской области при получении первичной, специализированной, реабилитационной, паллиативной помощи, санаторно-курортного лечения и лекарственного обеспечения — от записи к врачу до направления в федеральные центры",
            org: "Комитет по здравоохранению Ленинградской области",
            address: "191124, Санкт-Петербург, ул. Лафонская, д. 6, лит. А",
            phone: "+7 (812) 679-60-04",
            email: "sec.lokz@lenreg.ru",
            // note: "Мера организационного характера",
            type: "услуга"
        },
        {
            title: "Медицинская реабилитация",
            desc: "Направление на медицинскую реабилитацию при наличии медицинских показаний для пациентов с нарушениями функций ЦНС, нервной и костно-мышечной системы, а также с соматическими заболеваниями",
            docs: [
        {
            text: "Постановление Правительства ЛО от 18.09.2023 № 658 «Об утверждении региональной программы «Оптимальная для восстановления здоровья медицинская реабилитация в Ленинградской области»",
            link: "https://lenobl.ru/media/uploads/userfiles/2025/09/05/Постановление_Правительства_Ленинградской_области_от_18.09.2023__658.pdf"
        },{
            text: "Распоряжение Комитета по здравоохранению ЛО от 01.11.2021 № 570-о «Об организации оказания медицинской помощи по профилю «медицинская реабилитация»",
            link: "https://lenobl.ru/media/uploads/userfiles/2025/07/29/570_о.pdf"
        }
    ],
            org: "Комитет по здравоохранению Ленинградской области",
            address: "191124, Санкт-Петербург, ул. Лафонская, д. 6, лит. А",
            phone: "+7 (812) 679-60-04",
            email: "sec.lokz@lenreg.ru",
            type: "услуга"
        }
    ];

    // === СТРЕЛКА НАЗАД ===
    function getBackArrow() {
        return `
            <div class="back-arrow-circle" onclick="goBackToMain()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
        `;
    }

    // === СПИСОК МЕР ===
    function renderMeasures() {
        let html = `
            <div class="container payouts-list position-relative py-5">
                ${getBackArrow()}
                <h2 class="text-center mb-5 fw-bold text-primary">Здравоохранение</h2>
                <div class="row justify-content-center">
                    <div class="col-lg-8">
        `;

        measures.forEach((item, index) => {
            html += `
                <div class="card mb-4 shadow-sm border-0 measure-card" onclick="showDetails(${index})">
                    <div class="card-body p-4">
                        <h5 class="card-title text-success mb-3">${item.title}</h5>
                        <p class="text-muted small">${item.desc}</p>
                        ${item.note ? `<p class="badge bg-info text-dark mb-2">${item.note}</p>` : ''}
                    </div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
            </div>
        `;

        payoutsListContainer.innerHTML = html;
        payoutsListContainer.querySelector('.payouts-list').classList.add('show');
    }

    // === ДЕТАЛИ МЕРЫ ===
window.showDetails = function (index) {
    const m = measures[index];

    let docsHtml = '';
    if (m.docs && m.docs.length > 0) {
        docsHtml = '<h6 class="mt-3 text-primary">Нормативные акты:</h6><ul class="list-unstyled ps-3">';

        m.docs.forEach(doc => {
            if (typeof doc === 'object' && doc.link) {
                docsHtml += `
                    <li class="mb-3">
                        <a href="${doc.link}" target="_blank" class="text-decoration-none ">
                            PDF ${doc.text}
                        </a>
                    </li>`;
            } else {
                docsHtml += `<li class="mb-2"><small>• ${doc}</small></li>`;
            }
        });

        docsHtml += '</ul>';
    }

    const html = `
        <div class="container checklist-view position-relative py-5">
            ${getBackArrow()}
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="card border-0 shadow-lg">
                        <div class="card-body p-5">
                            <h3 class="text-success mb-4">${m.title}</h3>
                            <p class="lead text-muted">${m.desc}</p>

                            ${m.note ? `<p class="badge bg-info text-dark fs-6 px-3 py-2">${m.note}</p>` : ''}

                            ${docsHtml}

                            <hr class="my-4">

                            <h5 class="text-primary">Куда обращаться:</h5>
                            <p class="mb-1"><strong>${m.org}</strong></p>
                            <p class="mb-1">Адрес: ${m.address}</p>
                            <p class="mb-1">Телефон: <a href="tel:${m.phone.replace(/[^\d+]/g, '')}">${m.phone}</a></p>
                            <p class="mb-4">E-mail: <a href="mailto:${m.email}">${m.email}</a></p>

                            <div class="d-flex flex-wrap gap-3">
                                <a href="mailto:${m.email}" class="btn btn-outline-primary">
                                    Написать письмо
                                </a>
                                <button class="btn btn-outline-secondary" onclick="goBackToMeasures()">
                                    ← Назад к списку
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    payoutsListContainer.innerHTML = html;
    payoutsListContainer.querySelector('.checklist-view').classList.add('show');
};

    // === КЛИК ПО ИКОНКЕ ЗДРАВООХРАНЕНИЯ ===
    if (healthIcon) {
        healthIcon.addEventListener('click', function () {
            renderMeasures();
            mainView.style.display = 'none';
            document.body.style.background = '#f8f9fa';
        });
    }

    // === НАЗАД К ГЛАВНОМУ ЭКРАНУ ===
    window.goBackToMain = function () {
        const currentView = payoutsListContainer.querySelector('.payouts-list, .checklist-view');
        if (currentView) {
            currentView.classList.remove('show');
            setTimeout(() => {
                payoutsListContainer.innerHTML = '';
                mainView.style.display = 'block';
                document.body.style.background = 'var(--bg)';
            }, 300);
        }
    };

    // === НАЗАД К СПИСКУ МЕР ===
    window.goBackToMeasures = function () {
        renderMeasures();
    };

    // Анимация появления
    payoutsListContainer.addEventListener('transitionend', () => {
        const active = payoutsListContainer.querySelector('.show');
        if (active) active.style.overflow = 'visible';
    });
});