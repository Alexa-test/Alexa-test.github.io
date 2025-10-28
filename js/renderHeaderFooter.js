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
function setupMic() {
    const micBtn = document.querySelector('.mic-btn');
    if (micBtn) {
        micBtn.style.position = 'relative';
        micBtn.style.backgroundColor = 'transparent';
        micBtn.style.overflow = 'visible';

        const micIcon = micBtn.querySelector('i');
        if (micIcon) {
            micIcon.style.position = 'relative';
            micIcon.style.zIndex = '10'; // Иконка поверх всех элементов
        }

        // Добавляем стили для анимации, если еще не добавлены
        if (!document.getElementById('pulse-style')) {
            const style = document.createElement('style');
            style.id = 'pulse-style';
            style.innerHTML = `
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
            event.stopPropagation(); // Предотвращаем всплытие события клика

            // Проигрывание аудио
            const audio = new Audio('Привет Я твой ассист.m4a');
            audio.play();

            // Создание контейнера для анимации
            const container = document.createElement('div');
            container.className = 'assistant-container';
            container.style.position = 'absolute';
            container.style.width = '200px'; // Уменьшенный размер для микрофона
            container.style.height = '200px';
            container.style.top = '50%';
            container.style.left = '50%';
            container.style.transform = 'translate(-50%, -50%) scale(0)';
            container.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
            container.style.opacity = '1';
            container.style.zIndex = '0';

            // Создание центральной точки
            const centerPoint = document.createElement('div');
            centerPoint.className = 'center-point';
            centerPoint.style.width = '15px';
            centerPoint.style.height = '15px';
            centerPoint.style.background = "None";
            centerPoint.style.borderRadius = '50%';
            centerPoint.style.boxShadow = 'None';
            container.appendChild(centerPoint);

            // Создание эффекта свечения
            const glowEffect = document.createElement('div');
            glowEffect.className = 'glow-effect';
            glowEffect.style.width = '100%';
            glowEffect.style.height = '100%';
            glowEffect.style.borderRadius = '50%';
            glowEffect.style.background = 'radial-gradient(circle at center, rgba(0, 255, 163, 0.2) 0%, rgba(0, 209, 178, 0) 85%)';
            glowEffect.style.zIndex = '-1';
            container.appendChild(glowEffect);

            // Создание пульсации
            const pulse = document.createElement('div');
            pulse.className = 'pulse';
            pulse.style.width = '100%';
            pulse.style.height = '100%';
            pulse.style.borderRadius = '50%';
            pulse.style.background = 'radial-gradient(circle, rgba(0, 255, 163, 0.15) 0%, rgba(0, 209, 178, 0) 60%)';
            pulse.style.animation = 'pulse 8s infinite';
            pulse.style.zIndex = '-1';
            container.appendChild(pulse);

            // Создание пяти кругов с анимацией smoke
            const circles = [
                { class: 'circle-1', translate: 'translate(15px, -10px)', color1: 'rgba(0, 255, 163, 0.7)', color2: 'rgba(0, 163, 137, 0.4)', stop1: '10%', stop2: '90%', animation: 'smoke 18s infinite alternate ease-in-out' },
                { class: 'circle-2', translate: 'translate(-20px, 15px)', color1: 'rgba(0, 209, 178, 0.6)', color2: 'rgba(0, 163, 137, 0.3)', stop1: '15%', stop2: '85%', animation: 'smoke 22s infinite alternate ease-in-out' },
                { class: 'circle-3', translate: 'translate(25px, 25px)', color1: 'rgba(0, 255, 163, 0.5)', color2: 'rgba(0, 209, 178, 0.2)', stop1: '20%', stop2: '80%', animation: 'smoke 20s infinite alternate ease-in-out' },
                { class: 'circle-4', translate: 'translate(-15px, -25px)', color1: 'rgba(0, 209, 178, 0.4)', color2: 'rgba(0, 163, 137, 0.15)', stop1: '25%', stop2: '75%', animation: 'smoke 24s infinite alternate ease-in-out' },
                { class: 'circle-5', translate: 'translate(30px, -5px)', color1: 'rgba(0, 255, 163, 0.3)', color2: 'rgba(0, 209, 178, 0.1)', stop1: '30%', stop2: '70%', animation: 'smoke 26s infinite alternate ease-in-out' }
            ];

            circles.forEach(circleConfig => {
                const circle = document.createElement('div');
                circle.className = `circle ${circleConfig.class}`;
                circle.style.width = '100px'; // Уменьшенный размер кругов
                circle.style.height = '100px';
                circle.style.borderRadius = '50%';
                circle.style.transformOrigin = 'center';
                circle.style.filter = 'blur(4px)';
                circle.style.opacity = '0.65';
                circle.style.background = `radial-gradient(circle, ${circleConfig.color1} ${circleConfig.stop1}, ${circleConfig.color2} ${circleConfig.stop2})`;
                circle.style.top = '50%';
                circle.style.left = '50%';
                circle.style.transform = `translate(-50%, -50%) ${circleConfig.translate}`;
                circle.style.animation = circleConfig.animation;
                container.appendChild(circle);
            });

            micBtn.appendChild(container);

            // Анимация появления
            setTimeout(() => {
                container.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);

            // Функция для удаления контейнера с fade out
            const removeCircle = () => {
                container.style.opacity = '0';
                container.style.transform = 'translate(-50%, -50%) scale(1.2)';
                setTimeout(() => {
                    container.remove();
                }, 400);
                document.removeEventListener('click', removeCircle);
            };

            // Добавляем слушатель на клик по документу для удаления
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