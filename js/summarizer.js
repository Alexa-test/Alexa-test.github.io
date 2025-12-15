// === САММАРИЗАТОР ДОКУМЕНТОВ ===
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('summarizerBtn');
    const modal = document.getElementById('summarizerModal');
    const resultDiv = document.getElementById('summarizerResult');
    const analyzeBtn = document.getElementById('analyzeBtn');

    if (!btn || !modal) return;

    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
        analyzeDocs();
    });

    analyzeBtn.addEventListener('click', analyzeDocs);

    window.closeSummarizer = () => {
        modal.style.display = 'none';
    };

    // Основная логика анализа
    function analyzeDocs() {
        const checkedDocs = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.value.trim().toLowerCase());

        if (checkedDocs.length === 0) {
            resultDiv.innerHTML = `<p class="text-muted">Отметьте хотя бы один документ, чтобы увидеть рекомендации.</p>`;
            return;
        }

        // Здесь описываем, какие выплаты требуют каких документов
        const opportunities = [
            {
                title: "Ежемесячная выплата на ребёнка-инвалида",
                needed: ["свидетельство о рождении", "справка мсэк", "паспорт родителя"],
                missing: 0,
                link: "#vyplata-rebenok-invalid"
            },
            {
                title: "Компенсация за ЖКУ 50% (ребёнок-инвалид)",
                needed: ["справка мсэк", "свидетельство о рождении", "документ на жильё"],
                missing: 1,
                link: "#zhku-50"
            },
            {
                title: "Бесплатный проезд в транспорте",
                needed: ["справка мсэк"],
                missing: 0,
                link: "#proezd"
            },
            {
                title: "Санаторно-курортное лечение",
                needed: ["справка мсэк", "заявление", "медицинская справка 070/у"],
                missing: 2,
                link: "#sanatoriy"
            },
            // Добавляй свои реальные выплаты сюда
        ];

        let html = `<h5 class="text-success mb-3">Вы можете получить ещё:</h5><div class="row g-3">`;

        opportunities.forEach(op => {
            const hasAll = op.needed.every(doc => checkedDocs.some(d => d.includes(doc)));
            const missingCount = op.needed.filter(doc => !checkedDocs.some(d => d.includes(doc))).length;

            if (missingCount <= 3) {
                const badge = missingCount === 0 
                    ? '<span class="badge bg-success">Готово!</span>'
                    : `<span class="badge bg-warning">Нужно ещё ${missingCount}</span>`;

                html += `
                    <div class="col-md-6">
                        <div class="border rounded p-3 bg-light">
                            <h6 class="mb-2">${op.title}</h6>
                            <p class="small mb-2">${badge}</p>
                            ${missingCount > 0 ? `<p class="small text-muted mb-0">Нужно до собрать: ${missingCount} док.</p>` : ''}
                            <a href="${op.link}" class="btn btn-sm btn-outline-primary mt-2">Перейти →</a>
                        </div>
                    </div>
                `;
            }
        });

        if (!html.includes('col-md-6')) {
            html += `<p class="text-center text-muted">Пока нет подходящих мер с небольшим количеством недостающих документов.</p>`;
        }

        html += `</div>`;
        resultDiv.innerHTML = html;
    }
});