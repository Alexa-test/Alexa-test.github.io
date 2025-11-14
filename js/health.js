// === js/health.js ===
document.addEventListener('DOMContentLoaded', function () {
    const healthIcon = document.getElementById('healthIcon');
    const payoutsListContainer = document.getElementById('payoutsList');
    const mainView = document.getElementById('mainView');

    healthIcon.addEventListener('click', function () {
        const html = `
            <div class="container checklist-view position-relative">
                <div class="back-arrow-circle" onclick="goBackToMain()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="card border-0 shadow-sm text-center">
                            <div class="card-body p-5">
                                <div class="med-icon-large mb-4 mx-auto">
                                    <div class="med-shield-large">
                                        <div class="med-cross-large">
                                            <span class="cross-h"></span>
                                            <span class="cross-v"></span>
                                        </div>
                                    </div>
                                </div>
                                <h2 class="mb-3" style="color: #28a745; font-weight: 700;">
                                    Раздел в разработке
                                </h2>
                                <p class="lead text-muted mb-4">
                                    Скоро здесь будут:<br>
                                    • Меры поддежки в сфере здравоохранения<br>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        payoutsListContainer.innerHTML = html;
        mainView.style.display = 'none';
        document.body.style.background = '#f8f9fa';
        payoutsListContainer.querySelector('.checklist-view').classList.add('show');
    });
});