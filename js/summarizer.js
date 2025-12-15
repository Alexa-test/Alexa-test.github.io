// // === САММАРИЗАТОР ДОКУМЕНТОВ ===
// document.addEventListener('DOMContentLoaded', () => {
//     const btn = document.getElementById('summarizerBtn');
//     const modal = document.getElementById('summarizerModal');
//     const resultDiv = document.getElementById('summarizerResult');
//     const analyzeBtn = document.getElementById('analyzeBtn');

//     if (!btn || !modal) return;

//     btn.addEventListener('click', () => {
//         modal.style.display = 'flex';
//         analyzeDocs();
//     });

//     analyzeBtn.addEventListener('click', analyzeDocs);

//     window.closeSummarizer = () => {
//         modal.style.display = 'none';
//     };

//     // Основная логика анализа
//     function analyzeDocs() {
//         const checkedDocs = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
//             .map(cb => cb.value.trim().toLowerCase());

//         if (checkedDocs.length === 0) {
//             resultDiv.innerHTML = `<p class="text-muted">Отметьте хотя бы один документ, чтобы увидеть рекомендации.</p>`;
//             return;
//         }

//         // Здесь описываем, какие выплаты требуют каких документов
//         const opportunities = [
//             {
//                 title: "Ежемесячная выплата на ребёнка-инвалида",
//                 needed: ["свидетельство о рождении", "справка мсэк", "паспорт родителя"],
//                 missing: 0,
//                 link: "#vyplata-rebenok-invalid"
//             },
//             {
//                 title: "Компенсация за ЖКУ 50% (ребёнок-инвалид)",
//                 needed: ["справка мсэк", "свидетельство о рождении", "документ на жильё"],
//                 missing: 1,
//                 link: "#zhku-50"
//             },
//             {
//                 title: "Бесплатный проезд в транспорте",
//                 needed: ["справка мсэк"],
//                 missing: 0,
//                 link: "#proezd"
//             },
//             {
//                 title: "Санаторно-курортное лечение",
//                 needed: ["справка мсэк", "заявление", "медицинская справка 070/у"],
//                 missing: 2,
//                 link: "#sanatoriy"
//             },
//             // Добавляй свои реальные выплаты сюда
//         ];

//         let html = `<h5 class="text-success mb-3">Вы можете получить ещё:</h5><div class="row g-3">`;

//         opportunities.forEach(op => {
//             const hasAll = op.needed.every(doc => checkedDocs.some(d => d.includes(doc)));
//             const missingCount = op.needed.filter(doc => !checkedDocs.some(d => d.includes(doc))).length;

//             if (missingCount <= 3) {
//                 const badge = missingCount === 0 
//                     ? '<span class="badge bg-success">Готово!</span>'
//                     : `<span class="badge bg-warning">Нужно ещё ${missingCount}</span>`;

//                 html += `
//                     <div class="col-md-6">
//                         <div class="border rounded p-3 bg-light">
//                             <h6 class="mb-2">${op.title}</h6>
//                             <p class="small mb-2">${badge}</p>
//                             ${missingCount > 0 ? `<p class="small text-muted mb-0">Нужно до собрать: ${missingCount} док.</p>` : ''}
//                             <a href="${op.link}" class="btn btn-sm btn-outline-primary mt-2">Перейти →</a>
//                         </div>
//                     </div>
//                 `;
//             }
//         });

//         if (!html.includes('col-md-6')) {
//             html += `<p class="text-center text-muted">Пока нет подходящих мер с небольшим количеством недостающих документов.</p>`;
//         }

//         html += `</div>`;
//         resultDiv.innerHTML = html;
//     }
// });

// js/summarizer.js — Что ещё вы можете получить? (только анализ отмеченных в разделах документов)

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('summarizerBtn');
    const modal = document.getElementById('summarizerModal');
    const resultDiv = document.getElementById('summarizerResult');
    const analyzeBtn = document.getElementById('analyzeBtn');

    if (!btn || !modal || !resultDiv || !analyzeBtn) return;

    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
        resultDiv.innerHTML = '<p class="text-muted">Нажмите кнопку ниже, чтобы увидеть, на какие ещё меры поддержки вы можете претендовать на основе уже отмеченных документов.</p>';
    });

    analyzeBtn.addEventListener('click', analyzeDocs);

    window.closeSummarizer = () => {
        modal.style.display = 'none';
    };

    function analyzeDocs() {
        // Собираем ВСЕ отмеченные чекбоксы со всей страницы (из всех открытых чеклистов)
        const checkedCheckboxes = document.querySelectorAll('input.checklist-cb:checked'); // класс из socvyplaty.js
        const userDocIds = new Set();

        checkedCheckboxes.forEach(cb => {
            const docId = cb.dataset.docId;
            if (docId && DOCS_DB[docId]) {
                userDocIds.add(docId);
            }
        });

        if (userDocIds.size === 0) {
            resultDiv.innerHTML = '<p class="text-muted">Вы ещё не отметили ни одного документа в разделах. Зайдите в нужный раздел и отметьте галочками то, что у вас есть.</p>';
            return;
        }

        // === Реальные меры поддержки и требуемые документы (ID из DOCS_DB) ===
        const opportunities = [
            {
                title: "Единовременная выплата участникам СВО (30 000 ₽)",
                needed: ["passport", "registration", "svo_participation", "dismissal_order", "mir_card"],
                section: "socvyplaty"
            },
            {
                title: "Компенсация ЖКХ 50%",
                needed: ["passport", "svo_participation", "mir_card", "consent_personal"],
                section: "socvyplaty"
            },
            {
                title: "Льготный проезд (ЕСПБ) для семьи",
                needed: ["passport", "registration", "svo_participation", "family_proof", "photo_3x4"],
                section: "socvyplaty"
            },
            {
                title: "Выплата при ранении",
                needed: ["passport", "svo_participation", "injury_cert", "mir_card"],
                section: "socvyplaty"
            },
            {
                title: "Компенсация топлива",
                needed: ["passport", "svo_participation", "fuel_check", "no_central_heating"],
                section: "socvyplaty"
            },
            // Добавьте другие меры по аналогии
        ];

        let html = `<h5 class="text-success mb-4">На основе ваших документов вы можете получить:</h5>
                    <div class="row g-4">`;

        let hasAny = false;

        opportunities.forEach(op => {
            const missing = op.needed.filter(id => !userDocIds.has(id));
            const missingCount = missing.length;

            // Показываем, если не хватает не более 2 документов
            if (missingCount <= 2) {
                hasAny = true;
                const badge = missingCount === 0
                    ? '<span class="badge bg-success">Все документы есть!</span>'
                    : `<span class="badge bg-warning">Не хватает: ${missingCount}</span>`;

                const missingText = missingCount > 0
                    ? `<p class="small text-muted mb-2">Не хватает: ${missing.map(id => DOCS_DB[id].full).join(', ')}</p>`
                    : '';

                html += `
                    <div class="col-md-6 col-lg-4">
                        <div class="border rounded p-3 bg-light h-100 d-flex flex-column">
                            <h6 class="mb-2">${op.title} ${badge}</h6>
                            ${missingText}
                            <button class="btn btn-sm btn-outline-primary mt-auto" onclick="goToSection('${op.section}')">
                                Перейти к мере →
                            </button>
                        </div>
                    </div>`;
            }
        });

        if (!hasAny) {
            html += `<p class="text-center text-muted">Пока нет мер, к которым вы близки. Отмечайте больше документов в разделах!</p>`;
        }

        html += `</div>`;
        resultDiv.innerHTML = html;
    }

    // Функция перехода к разделу (пример для соцвыплат)
    window.goToSection = function(sectionId) {
        window.goBackToMain(); // закрываем текущий вид
        setTimeout(() => {
            if (sectionId === 'socvyplaty') {
                document.getElementById('rubIcon')?.click();
            }
            // Добавьте для health, tsr и т.д.
        }, 350);
        closeSummarizer();
    };
});