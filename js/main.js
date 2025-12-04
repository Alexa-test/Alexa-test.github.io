// js/main.js — универсальный обработчик ВСЕХ иконок КРОМЕ социальных выплат
document.addEventListener('DOMContentLoaded', () => {
    const payoutsList = document.getElementById('payoutsList');
    const mainView = document.getElementById('mainView');

    // Глобальная функция «назад» (нужна всем разделам)
    window.goBackToMain = () => {
        payoutsList.innerHTML = '';
        mainView.style.display = 'block';
        document.body.style.background = '';
    };

    // Обрабатываем ВСЕ иконки
    document.querySelectorAll('.icon-block').forEach(block => {
        block.addEventListener('click', function () {
            const id = this.dataset.id;

            // ←←← ВАЖНО: полностью игнорируем иконку социальных выплат
            if (id === 'socvyplaty' || id === 'health') {
                return; // ничего не делаем — за это отвечает socvyplaty.js и health.js
            }

            // Все остальные иконки — показываем красивую заглушку
            const title = this.dataset.title;
            const iconCopy = this.querySelector('.icon-inner svg, .logo-container, .logo-img')?.outerHTML || '';

            const html = `
                <div class="container checklist-view position-relative py-5">
                    <div class="back-arrow-circle" onclick="goBackToMain()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-lg-7 col-xxl-6">
                            <div class="card border-0 shadow-lg text-center">
                                <div class="card-body p-5">
                                    
                                    <h2 class="mb-4" style="font-weight:700;color:#333;">
                                        ${title}
                                    </h2>
                                    <p class="lead text-muted">
                                        Раздел в разработке<br><br>
                                        Скоро здесь появятся все доступные меры поддержки и услуги.
                                    </p>
                                    <button class="btn btn-outline-primary mt-3" onclick="goBackToMain()">
                                        ← Назад
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            mainView.style.display = 'none';
            payoutsList.innerHTML = html;
            document.body.style.background = '#f8f9fa';
            setTimeout(() => payoutsList.querySelector('.checklist-view').classList.add('show'), 50);
        });
    });
});