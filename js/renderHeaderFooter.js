// Функция для отрисовки хэдера (меню)
function renderHeader() {
    const header = document.createElement('div');
    header.className = 'header d-flex align-items-center justify-content-between';
    header.innerHTML = `
        <button class="arrow-btn" onclick="scrollMenu('left')">
            <i class="bi bi-chevron-left"></i>
        </button>
        <div class="menu-icons">
            <a href="cabinet.html" class="menu-icon${window.location.pathname.includes('cabinet.html') ? ' active' : ''}">
                <div class="menu-icon-img"><i class="bi bi-person-fill"></i></div>
                <span class="menu-icon-label">Профиль</span>
            </a>
            <a href="news.html" class="menu-icon${window.location.pathname.includes('news.html') ? ' active' : ''}">
                <div class="menu-icon-img"><i class="bi bi-newspaper"></i></div>
                <span class="menu-icon-label">Новости</span>
            </a>
            <a href="education.html" class="menu-icon${window.location.pathname.includes('education.html') ? ' active' : ''}">
                <div class="menu-icon-img"><i class="bi bi-book"></i></div>
                <span class="menu-icon-label">Обучение</span>
            </a>
            <a href="documents.html" class="menu-icon${window.location.pathname.includes('documents.html') ? ' active' : ''}">
                <div class="menu-icon-img"><i class="bi bi-file-text"></i></div>
                <span class="menu-icon-label">Документы</span>
            </a>
            <a href="health.html" class="menu-icon${window.location.pathname.includes('health.html') ? ' active' : ''}">
                <div class="menu-icon-img"><i class="bi bi-heart-pulse"></i></div>
                <span class="menu-icon-label">Здоровье</span>
            </a>
            <a href="services.html" class="menu-icon${window.location.pathname.includes('services.html') ? ' active' : ''}">
                <div class="menu-icon-img"><i class="bi bi-grid-3x3-gap"></i></div>
                <span class="menu-icon-label">Сервисы</span>
            </a>
        </div>
        <button class="arrow-btn" onclick="scrollMenu('right')">
            <i class="bi bi-chevron-right"></i>
        </button>
    `;
    document.body.prepend(header);
}

// Функция для отрисовки футера (поисковая строка и микрофон)
function renderFooter() {
    const footer = document.createElement('div');
    footer.className = 'footer';
    // Определяем плейсхолдер в зависимости от текущей страницы
    const placeholders = {
        'cabinet.html': 'Поиск',
        'news.html': 'Поиск новостей',
        'education.html': 'Поиск курсов',
        'documents.html': 'Поиск документов',
        'health.html': 'Поиск врачей или услуг',
        'services.html': 'Поиск сервисов'
    };
    const currentPage = window.location.pathname.split('/').pop() || 'cabinet.html';
    const placeholder = placeholders[currentPage] || 'Поиск';
    
    footer.innerHTML = `
        <div class="input-group">
            <input type="text" class="form-control search-bar" placeholder="${placeholder}">
            <button class="mic-btn"><i class="bi bi-mic"></i></button>
        </div>
    `;
    document.body.append(footer);
}

// Функция для прокрутки меню
function scrollMenu(direction) {
    const menu = document.querySelector('.menu-icons');
    const scrollAmount = 150;
    if (direction === 'left') {
        menu.scrollLeft -= scrollAmount;
    } else {
        menu.scrollLeft += scrollAmount;
    }
}

// Обработка активного состояния меню
function setupMenu() {
    document.querySelectorAll('.menu-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            document.querySelectorAll('.menu-icon').forEach(i => {
                i.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Обработка поиска
function setupSearch() {
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        searchBar.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }
}

// Обработка клика на микрофон
// Обработка клика на микрофон
function setupMic() {
    const micBtn = document.querySelector('.mic-btn');
    if (micBtn) {
        micBtn.style.position = 'relative';
        micBtn.style.backgroundColor = 'transparent';
        micBtn.style.overflow = 'visible';
        micBtn.style.zIndex = '30'; // Кнопка выше всего

        const micIcon = micBtn.querySelector('i');
        if (micIcon) {
            micIcon.style.position = 'relative';
            micIcon.style.zIndex = '25'; // Иконка выше анимации
        }

        // Добавляем ТОЧНЫЕ стили из вашего CSS (если еще не добавлены)
        if (!document.getElementById('exact-smoke-style')) {
            const style = document.createElement('style');
            style.id = 'exact-smoke-style';
            style.innerHTML = `
                .exact-circle {
                    position: absolute !important;
                    width: 250px !important;
                    height: 250px !important;
                    border-radius: 50% !important;
                    transform-origin: center !important;
                    filter: blur(4px) !important;
                    opacity: 0.65 !important;
                    background: radial-gradient(circle, 
                        var(--color1) var(--stop1), 
                        var(--color2) var(--stop2)) !important;
                    top: 50% !important;
                    left: 50% !important;
                }

                .exact-circle-1 {
                    --color1: rgba(0, 255, 163, 0.7);
                    --color2: rgba(0, 163, 137, 0.4);
                    --stop1: 10%;
                    --stop2: 90%;
                    transform: translate(-50%, -50%) translate(15px, -10px) !important;
                    animation: smoke 18s infinite alternate ease-in-out !important;
                }

                .exact-circle-2 {
                    --color1: rgba(0, 209, 178, 0.6);
                    --color2: rgba(0, 163, 137, 0.3);
                    --stop1: 15%;
                    --stop2: 85%;
                    transform: translate(-50%, -50%) translate(-20px, 15px) !important;
                    animation: smoke 22s infinite alternate ease-in-out !important;
                }

                .exact-circle-3 {
                    --color1: rgba(0, 255, 163, 0.5);
                    --color2: rgba(0, 209, 178, 0.2);
                    --stop1: 20%;
                    --stop2: 80%;
                    transform: translate(-50%, -50%) translate(25px, 25px) !important;
                    animation: smoke 20s infinite alternate ease-in-out !important;
                }

                .exact-circle-4 {
                    --color1: rgba(0, 209, 178, 0.4);
                    --color2: rgba(0, 163, 137, 0.15);
                    --stop1: 25%;
                    --stop2: 75%;
                    transform: translate(-50%, -50%) translate(-15px, -25px) !important;
                    animation: smoke 24s infinite alternate ease-in-out !important;
                }

                .exact-circle-5 {
                    --color1: rgba(0, 255, 163, 0.3);
                    --color2: rgba(0, 209, 178, 0.1);
                    --stop1: 30%;
                    --stop2: 70%;
                    transform: translate(-50%, -50%) translate(30px, -5px) !important;
                    animation: smoke 26s infinite alternate ease-in-out !important;
                }

                .exact-glow-effect {
                    position: absolute !important;
                    width: 100% !important;
                    height: 100% !important;
                    border-radius: 50% !important;
                    background: radial-gradient(circle at center, 
                        rgba(0, 255, 163, 0.2) 0%, 
                        rgba(0, 209, 178, 0) 85%) !important;
                    z-index: -1 !important;
                }

                .exact-pulse {
                    position: absolute !important;
                    width: 100% !important;
                    height: 100% !important;
                    border-radius: 50% !important;
                    background: radial-gradient(circle, 
                        rgba(0, 255, 163, 0.15) 0%, 
                        rgba(0, 209, 178, 0) 60%) !important;
                    animation: pulse 8s infinite !important;
                    z-index: -1 !important;
                }

                @keyframes smoke {
                    0% { 
                        transform: translate(-50%, -50%) translate(20px, -10px) scale(0.95);
                        opacity: 0.55;
                    }
                    25% { 
                        transform: translate(-50%, -50%) translate(-15px, 25px) scale(1.05);
                        opacity: 0.65;
                    }
                    50% { 
                        transform: translate(-50%, -50%) translate(30px, 15px) scale(0.98);
                        opacity: 0.7;
                    }
                    75% { 
                        transform: translate(-50%, -50%) translate(-25px, -20px) scale(1.02);
                        opacity: 0.6;
                    }
                    100% { 
                        transform: translate(-50%, -50%) translate(20px, -10px) scale(0.95);
                        opacity: 0.55;
                    }
                }

                @keyframes pulse {
                    0% { 
                        transform: translate(-50%, -50%) scale(0.9);
                        opacity: 0.2;
                    }
                    50% { 
                        transform: translate(-50%, -50%) scale(1.1);
                        opacity: 0.35;
                    }
                    100% { 
                        transform: translate(-50%, -50%) scale(0.9);
                        opacity: 0.2;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        micBtn.addEventListener('click', function(event) {
            event.stopPropagation();

            // Проигрывание аудио
            const audio = new Audio('Привет Я твой ассист.m4a');
            audio.play();

            // Создание контейнера (250px, но scale(0.32) для ~80px)
            const container = document.createElement('div');
            container.className = 'exact-assistant-container';
            container.style.position = 'absolute';
            container.style.width = '250px';
            container.style.height = '250px';
            container.style.top = '50%';
            container.style.left = '50%';
            container.style.transform = 'translate(-50%, -50%) scale(0)';
            container.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
            container.style.opacity = '1';
            container.style.zIndex = '5';

            // Центральная точка (позади микрофона)
            const centerPoint = document.createElement('div');
            centerPoint.className = 'center-point';
            centerPoint.style.position = 'absolute';
            centerPoint.style.width = '30px';
            centerPoint.style.height = '30px';
            centerPoint.style.background = '#00D1B2';
            centerPoint.style.borderRadius = '50%';
            centerPoint.style.zIndex = '5'; // Позади иконки (25)
            centerPoint.style.top = '50%';
            centerPoint.style.left = '50%';
            centerPoint.style.transform = 'translate(-50%, -50%)';
            centerPoint.style.boxShadow = '0 0 25px rgba(0, 210, 178, 0.7)';
            container.appendChild(centerPoint);

            // Glow effect
            const glow = document.createElement('div');
            glow.className = 'exact-glow-effect';
            container.appendChild(glow);

            // Pulse
            const pulse = document.createElement('div');
            pulse.className = 'exact-pulse';
            container.appendChild(pulse);

            // ТОЧНЫЕ 5 кругов с КЛАССАМИ CSS + разная прозрачность
            ['1', '2', '3', '4', '5'].forEach(i => {
                const circle = document.createElement('div');
                circle.className = `exact-circle exact-circle-${i}`;
                circle.style.opacity = (0.8 - (i - 1) * 0.1).toFixed(2); // 0.8, 0.7, 0.6, 0.5, 0.4
                container.appendChild(circle);
            });

            micBtn.appendChild(container);

            // Появление
            setTimeout(() => {
                container.style.transform = 'translate(-50%, -50%) scale(0.32)'; // Точный масштаб
            }, 10);

            // Удаление
            const removeCircle = () => {
                container.style.opacity = '0';
                container.style.transform = 'translate(-50%, -50%) scale(0.38)'; // Немного больше
                setTimeout(() => container.remove(), 600);
                document.removeEventListener('click', removeCircle);
            };
            document.addEventListener('click', removeCircle);
        });
    }
}

// Инициализация хэдера и футера
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    setupMenu();
    setupSearch();
    setupMic();
});