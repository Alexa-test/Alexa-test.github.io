// js/tsr.js — Технические средства реабилитации (ТСР)
document.addEventListener('DOMContentLoaded', function () {
    const mainView = document.getElementById('mainView');
    const payoutsListContainer = document.getElementById('payoutsList');
    const tsrIcon = document.querySelector('.icon-block[data-id="tsr"]');

    // === ДАННЫЕ ТСР: название + ссылка + номер фото (соответствует файлу img/tsr/1.jpg, 2.jpg и т.д.) ===
    const tsrItems = [
        { title: "Кресло-стул с санитарным оснащением Flamingo RU", link: "https://example.com/prokat", img: 1 },
        { title: "Автокресло для детей с ДЦП (дети-инвалиды)", link: "https://example.com/prokat", img: 2 },
        { title: "Автокресло для детей с ДЦП RECARO Monza CFX Reha", link: "https://example.com/prokat", img: 3 },
        { title: "Автокресло для детей с ДЦП Thomashilfen Hercules Prime", link: "https://example.com/prokat", img: 4 },
        { title: "Ванна надувная", link: "https://example.com/prokat", img: 5 },
        { title: "Велосипед трехколесный для детей с ДЦП", link: "https://example.com/prokat", img: 6 },
        { title: "Велотренажер МануПед (для участников СВО)", link: "https://example.com/prokat", img: 7 },
        { title: "Вертикализатор (опора для стояния) передне-заднеопорный, размер 1", link: "https://example.com/prokat", img: 8 },
        { title: "Вертикализатор (опора для стояния) передне-заднеопорный, размер 2", link: "https://example.com/prokat", img: 9 },
        { title: "Вертикализатор наклонный для взрослых", link: "https://example.com/prokat", img: 10 },
        { title: "Вращающееся сиденье для ванны", link: "https://example.com/prokat", img: 11 },
        { title: "Двухуровневые опоры-ходунки", link: "https://example.com/prokat", img: 12 },
        { title: "Доска для пересадки Armed FS-1", link: "https://example.com/prokat", img: 13 },
        { title: "Доска для пересаживания инвалида", link: "https://example.com/prokat", img: 14 },
        { title: "Дуга напольная прикроватная", link: "https://example.com/prokat", img: 15 },
        { title: "Заднеопорные ходунки-роллаторы для детей с ДЦП", link: "https://example.com/prokat", img: 16 },
        { title: "Инвалидное кресло-коляска механическая для полных", link: "https://example.com/prokat", img: 17 },
        { title: "Иппотренажер Takasima S-Rider Sky 007", link: "https://example.com/prokat", img: 18 },
        { title: "Костыли детские", link: "https://example.com/prokat", img: 19 },
        { title: "Костыли подмышечные", link: "https://example.com/prokat", img: 20 },
        { title: "Костыли с опорой под локоть", link: "https://example.com/prokat", img: 21 },
        { title: "Костюм-тренажер для реабилитации", link: "https://example.com/prokat", img: 22 },
        { title: "Кресло для ванной", link: "https://example.com/prokat", img: 23 },
        { title: "Кресло-коляска детская, в том числе для детей с ДЦП", link: "https://example.com/prokat", img: 24 },
        { title: "Кресло-коляска с ручным приводом", link: "https://example.com/prokat", img: 25 },
        { title: "Кресло-коляска с электроприводом", link: "https://example.com/prokat", img: 26 },
        { title: "Кресло-коляска с ручным приводом для детей", link: "https://example.com/prokat", img: 27 },
        { title: "Кресло-стул с санитарным оснащением", link: "https://example.com/prokat", img: 28 },
        { title: "Кровать функциональная с механическим приводом", link: "https://example.com/prokat", img: 29 },
        { title: "Кровать функциональная с электрическим приводом", link: "https://example.com/prokat", img: 30 },
        { title: "Многофункциональные модульные опоры-ходунки", link: "https://example.com/prokat", img: 31 },
        { title: "Опора-вертикализатор для детей-инвалидов", link: "https://example.com/prokat", img: 32 },
        { title: "Опора для стояния для детей-инвалидов", link: "https://example.com/prokat", img: 33 },
        { title: "Ортопедическое реабилитационное кресло Мэйоу", link: "https://example.com/prokat", img: 34 },
        { title: "Параподий динамический", link: "https://example.com/prokat", img: 35 },
        { title: "Парта для детей с ДЦП", link: "https://example.com/prokat", img: 36 },
        { title: "Подъемник передвижной", link: "https://example.com/prokat", img: 37 },
        { title: "Поручни для самоподнимания", link: "https://example.com/prokat", img: 38 },
        { title: "Противопролежневый матрац воздушный", link: "https://example.com/prokat", img: 39 },
        { title: "Реабилитационное детское кресло-коляска", link: "https://example.com/prokat", img: 40 },
        { title: "Сиденье вращающееся для ванны", link: "https://example.com/prokat", img: 41 },
        { title: "Сиденье для ванны поворотное", link: "https://example.com/prokat", img: 42 },
        { title: "Стул для ванны со спинкой", link: "https://example.com/prokat", img: 43 },
        { title: "Стул ортопедический детский", link: "https://example.com/prokat", img: 44 },
        { title: "Трость 4-х опорная", link: "https://example.com/prokat", img: 45 },
        { title: "Ходунки для детей-инвалидов с ДЦП", link: "https://example.com/prokat", img: 46 },
        { title: "Ходунки роллаторы на колесах", link: "https://example.com/prokat", img: 47 },
        { title: "Ходунки-опоры двухуровневые", link: "https://example.com/prokat", img: 48 }
        // Добавляй новые — просто увеличивай номер img
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

    // Рендер списка
    function renderTSR() {
        let html = `
            <div class="container payouts-list position-relative py-5">
                ${getBackArrow()}
                <h2 class="text-center mb-5 fw-bold text-primary">Технические средства реабилитации</h2>
                <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-4 justify-content-center">
        `;

        tsrItems.forEach(item => {
            html += `
                <div class="col">
                    <div class="card h-100 shadow-sm border-0 text-center hover-lift transition-all">
                        <div class="position-relative overflow-hidden bg-light" style="height: 180px;">
                            <img src="img/tsr/${item.img}.jpg" 
                                 alt="${item.title}"
                                 class="img-fluid w-100 h-100"
                                 style="object-fit: cover;"
                                 onerror="this.src='https://via.placeholder.com/300?text=Нет+фото'">
                        </div>
                        <div class="card-body d-flex flex-column p-3">
                            <h6 class="card-title small mb-3 flex-grow-1">${item.title}</h6>
                            <a href="${item.link}" target="_blank" class="btn btn-primary btn-sm mt-auto">
                                Наличие в пункте проката
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        payoutsListContainer.innerHTML = html;

        // Анимация появления
        const view = payoutsListContainer.querySelector('.payouts-list');
        view.style.opacity = '0';
        view.style.transform = 'translateY(20px)';
        setTimeout(() => {
            view.style.transition = 'all 0.4s ease';
            view.style.opacity = '1';
            view.style.transform = 'translateY(0)';
            view.classList.add('show');
        }, 50);
    }

    // Клик по иконке
    if (tsrIcon) {
        tsrIcon.addEventListener('click', () => {
            renderTSR();
            mainView.style.display = 'none';
            document.body.style.background = '#f8f9fa';
        });
    }

    // Назад
    window.goBackToMain = window.goBackToMain || function () {
        const view = payoutsListContainer.querySelector('.payouts-list');
        if (view) {
            view.classList.remove('show');
            setTimeout(() => {
                payoutsListContainer.innerHTML = '';
                mainView.style.display = 'block';
                document.body.style.background = '';
            }, 300);
        }
    };
});