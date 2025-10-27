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

// Инициализация хэдера и футера
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    setupMenu();
    setupSearch();
});