// ==UserScript==
// @name         Student Helper Style
// @namespace    https://github.com/AbrikosV/StudentHelperStyle
// @version      1.3.0
// @description  Улучшенный интерфейс расписания для студентов ФГОУПСК
// @author       AbrikosV 
// @match        https://system.fgoupsk.ru/student/*
// @grant        none
// @run-at       document-end
// @license      MIT
// @downloadURL  https://github.com/AbrikosV/StudentHelperStyle/raw/main/StudentHelperStyleTT.user.js
// @updateURL    https://github.com/AbrikosV/StudentHelperStyle/raw/main/StudentHelperStyleTT.user.js
// ==/UserScript==

(function () {
    'use strict';

    // === ИЗОЛЯЦИЯ ===
    if (document.body.classList.contains('fgoupsk-enhanced')) return;
    document.body.classList.add('fgoupsk-enhanced');

    // === СТИЛИ ===
    const style = document.createElement('style');
    style.textContent = `
        /* ===== ГЛОБАЛЬНЫЕ СТИЛИ ===== */
        .fgoupsk-enhanced body {
            background: #fafafa !important;
            color: #2c3e50 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
            line-height: 1.5 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        /* ===== ОСНОВНОЙ КОНТЕЙНЕР ===== */
        .fgoupsk-enhanced > :not(script):not(style):not(head):not(meta):not(title) {
            max-width: 1200px !important;
            margin: 20px auto !important;
            padding: 0 16px !important;
        }

        /* ===== ПОЛЕ ДАТЫ + КНОПКИ НАВИГАЦИИ ===== */
        .fgoupsk-enhanced .form-inline {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            padding: 12px 16px !important;
            background: white !important;
            border: 1px solid #e0e0e0 !important;
            border-radius: 8px !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.03) !important;
            margin: 0 0 20px 0 !important;
        }

        .fgoupsk-enhanced input[name="d"] {
            flex: 1 !important;
            padding: 8px 12px !important;
            border: 1px solid #ced4da !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            color: #495057 !important;
        }

        .fgoupsk-enhanced input[name="d"]:focus {
            outline: none !important;
            border-color: #007bff !important;
            box-shadow: 0 0 0 2px rgba(0,123,255,0.1) !important;
        }

        .fgoupsk-enhanced button.btn[type="submit"] {
            background: #007bff !important;
            border: none !important;
            color: white !important;
            padding: 8px 16px !important;
            border-radius: 6px !important;
            cursor: pointer !important;
            transition: background 0.2s !important;
        }

        .fgoupsk-enhanced button.btn[type="submit"]:hover {
            background: #0056b3 !important;
        }

        /* ===== КНОПКИ НАВИГАЦИИ ПО ДАТАМ ===== */
        .fgoupsk-enhanced .date-controls {
            display: inline-flex !important;
            gap: 6px !important;
            margin-left: 8px !important;
        }

        .fgoupsk-enhanced .date-controls button {
            width: 36px !important;
            height: 36px !important;
            border: 1px solid #ced4da !important;
            border-radius: 6px !important;
            background: white !important;
            color: #495057 !important;
            font-weight: bold !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.2s ease !important;
        }

        .fgoupsk-enhanced .date-controls button:hover {
            background: #f1f3f5 !important;
            transform: translateY(-1px);
        }

        .fgoupsk-enhanced .date-controls button:active {
            transform: translateY(0);
        }

        /* ===== ТАБЛИЦА РАСПИСАНИЯ ===== */
        .fgoupsk-enhanced table.table {
            width: 100% !important;
            border-collapse: collapse !important;
            border-radius: 8px !important;
            overflow: hidden !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
            background: white !important;
            margin: 20px 0 !important;
        }

        .fgoupsk-enhanced table.table thead th {
            background: #f8f9fa !important;
            color: #495057 !important;
            font-weight: 600 !important;
            padding: 12px 16px !important;
            text-align: left !important;
            border-bottom: 2px solid #dee2e6 !important;
        }

        .fgoupsk-enhanced table.table tbody tr {
            border-bottom: 1px solid #f1f3f5 !important;
        }

        .fgoupsk-enhanced table.table tbody tr:last-child {
            border-bottom: none !important;
        }

        .fgoupsk-enhanced table.table tbody tr:hover {
            background: #f8f9fa !important;
        }

        .fgoupsk-enhanced table.table td {
            padding: 12px 16px !important;
            color: #212529 !important;
            vertical-align: top !important;
        }

        .fgoupsk-enhanced table.table td:first-child,
        .fgoupsk-enhanced table.table th:first-child {
            width: 50px !important;
            text-align: center !important;
        }

        /* ===== ЗАГОЛОВКИ ===== */
        .fgoupsk-enhanced h2 {
            font-size: 1.4rem !important;
            font-weight: 600 !important;
            color: #2c3e50 !important;
            margin: 24px 0 12px 0 !important;
            padding-bottom: 6px !important;
            border-bottom: 2px solid #007bff !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
        }

        /* ===== БЛОК ДИСЦИПЛИН ===== */
        .fgoupsk-enhanced .disciplines-header {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            font-size: 1.3rem !important;
            font-weight: 600 !important;
            color: #2c3e50 !important;
            margin: 24px 0 12px 0 !important;
            cursor: pointer !important;
            padding: 8px 12px !important;
            background: #f8f9fa !important;
            border-radius: 8px !important;
            transition: background 0.2s !important;
        }

        .fgoupsk-enhanced .disciplines-header:hover {
            background: #e9ecef !important;
        }

        .fgoupsk-enhanced .disciplines-header .menu-toggle {
            font-size: 1.2rem !important;
            color: #6c757d !important;
            transition: transform 0.3s ease !important;
        }

        .fgoupsk-enhanced .disciplines-header .menu-toggle.rotated {
            transform: rotate(180deg) !important;
        }

        .fgoupsk-enhanced #disciplines-table {
            margin-top: 12px !important;
            transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease !important;
            overflow: hidden !important;
        }

        .fgoupsk-enhanced #disciplines-table.hidden {
            max-height: 0 !important;
            opacity: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
        }

        /* ===== МЕНЮ НАСТРОЕК ===== */
        .fgoupsk-enhanced #settings-menu {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white !important;
            border: 1px solid #e0e0e0 !important;
            border-radius: 8px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important;
            padding: 16px;
            z-index: 9999;
            display: none;
            min-width: 240px;
        }

        .fgoupsk-enhanced #settings-menu h4 {
            margin: 0 0 12px 0;
            font-weight: 600;
            text-align: center;
            color: #2c3e50;
        }

        .fgoupsk-enhanced .switch-container {
            display: flex;
            align-items: center;
            margin: 8px 0;
            cursor: pointer;
        }

        .fgoupsk-enhanced .switch-label {
            margin-left: 10px;
            font-size: 14px;
            color: #2c3e50;
        }

        .fgoupsk-enhanced .switch {
            position: relative;
            display: inline-block;
            width: 46px;
            height: 22px;
            border-radius: 22px;
            background: #e0e0e0;
            transition: 0.2s;
        }

        .fgoupsk-enhanced .switch::before {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 18px;
            height: 18px;
            background: white;
            border-radius: 50%;
            transition: 0.2s;
        }

        .fgoupsk-enhanced .switch.checked {
            background: #007bff;
        }

        .fgoupsk-enhanced .switch.checked::before {
            transform: translateX(24px);
        }

        /* ===== ЗАТЕМНЕНИЕ ФОНА ПРИ ОТКРЫТИИ МЕНЮ ===== */
        .fgoupsk-enhanced .settings-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.3);
            z-index: 9998;
            display: none;
        }

        /* ===== ТЁМНАЯ ТЕМА ===== */
        .fgoupsk-enhanced [data-theme="dark"] {
            --bg-page: #0f0f12;
            --bg-card: #1e1e1e;
            --text-primary: #ffffff;
            --text-secondary: #cccccc;
            --border: #333;
            --shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .fgoupsk-enhanced [data-theme="dark"] body {
            background: #0f0f12 !important;
            color: #e6e6e6 !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] .form-inline,
        .fgoupsk-enhanced [data-theme="dark"] table.table,
        .fgoupsk-enhanced [data-theme="dark"] .disciplines-header {
            background: #1e1e1e !important;
            border-color: #333 !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] table.table thead th {
            background: #2a2a2a !important;
            border-bottom-color: #444 !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] table.table tbody tr {
            border-bottom-color: #333 !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] table.table tbody tr:hover {
            background: #252525 !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] input[name="d"] {
            background: #2a2a2a !important;
            border-color: #444 !important;
            color: #e6e6e6 !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] input[name="d"]:focus {
            border-color: #007bff !important;
            box-shadow: 0 0 0 2px rgba(0,123,255,0.2) !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] .date-controls button,
        .fgoupsk-enhanced [data-theme="dark"] button.btn[type="submit"] {
            background: #2a2a2a !important;
            border-color: #444 !important;
            color: #e6e6e6 !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] .date-controls button:hover {
            background: #333 !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] h2 {
            color: #ffffff !important;
            border-bottom-color: #007bff !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] .disciplines-header {
            background: #2a2a2a !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] .disciplines-header:hover {
            background: #333 !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] a {
            color: #5c9dff !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] a:hover {
            color: #a0c1ff !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] #settings-menu {
            background: #1e1e1e !important;
            border-color: #333 !important;
            box-shadow: 0 6px 20px rgba(0,0,0,0.4) !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] #settings-menu h4,
        .fgoupsk-enhanced [data-theme="dark"] .switch-label {
            color: #e6e6e6 !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] .switch {
            background: #555 !important;
        }

        .fgoupsk-enhanced [data-theme="dark"] .switch.checked {
            background: #4a86e8 !important;
        }
    `;
    document.head.appendChild(style);

    // === ХЕЛПЕРЫ ===
    const q = (sel, ctx = document) => ctx.querySelector(sel);
    const qa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    const formatDate = d => {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        return `${dd}.${mm}.${d.getFullYear()}`;
    };

    const getCurrentDate = str => {
        const [d, m, y] = str.split('.').map(Number);
        return new Date(y, m - 1, d);
    };


    // === ИНИЦИАЛИЗАЦИЯ ===
    function init() {
        try {
            // 1. Удаляем "Расписание" и <hr>
            const h2Schedule = qa('h2').find(h => h.textContent.trim().includes('Расписание'));
            if (h2Schedule) {
                h2Schedule.remove();
                const nextHR = h2Schedule.nextElementSibling;
                if (nextHR?.tagName === 'HR') nextHR.remove();
            }

            // 2. Удаляем "полное расписание"
            const fullLink = q('a[href*="page=r"]');
            if (fullLink) fullLink.remove();

            // 3. Исправляем ссылку "Группа"
            const groupLink = q('a[href*="mode=ucheba&act=group"]');
            if (groupLink) {
                groupLink.href = groupLink.href.replace(/(&act2=[^&]*)?/, '&act2=prog');
            }

            // 4. Кнопки даты
            const dateInput = q('input[name="d"]');
            const searchBtn = q('button[type="submit"].btn.btn-primary');
            if (!dateInput || !searchBtn) return;

            const ctrl = document.createElement('div');
            ctrl.className = 'date-controls';

            ['←', '🏠', '→'].forEach((txt, i) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = txt;
                btn.setAttribute('aria-label',
                    i === 0 ? 'Предыдущий день' :
                    i === 1 ? 'Сегодня' :
                    'Следующий день'
                );

                btn.onclick = () => {
                    const d = getCurrentDate(dateInput.value);
                    d.setDate(d.getDate() + (i === 0 ? -1 : i === 2 ? 1 : 0));
                    if (i === 1) d.setTime(Date.now());
                    const str = formatDate(d);
                    dateInput.value = str;
                    window.location.search = `?mode=ucheba&d=${encodeURIComponent(str)}`;
                };

                btn.addEventListener('keydown', e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        btn.click();
                    }
                });

                ctrl.appendChild(btn);
            });

            searchBtn.parentNode.insertBefore(ctrl, searchBtn.nextSibling);

            dateInput.addEventListener('keydown', e => {
                if (e.ctrlKey && e.key === 'Enter') {
                    e.preventDefault();
                    searchBtn.click();
                }
            });

            // 5. Связывание дисциплин и расписания
            const tables = qa('table.table.table-striped');
            if (tables.length >= 2) {
                const [schedTable, discTable] = tables;

                const discMap = new Map();
                qa('tbody tr', discTable).forEach(tr => {
                    const a = q('td:nth-child(2) a[href]', tr);
                    if (a) {
                        const name = a.textContent.trim();
                        discMap.set(name, a.href);
                    }
                });

                qa('tbody tr', schedTable).forEach(tr => {
                    const td = q('td:nth-child(2)', tr);
                    if (!td) return;
                    const name = td.textContent.trim();
                    const href = discMap.get(name);
                    if (href) {
                        const link = document.createElement('a');
                        link.href = href;
                        link.textContent = name;
                        link.title = 'Перейти к программе дисциплины';
                        td.innerHTML = '';
                        td.appendChild(link);
                    }
                });
            }

            // 6. Кнопка ☰ для "Дисциплин"
            const h2Disc = qa('h2').find(h => h.textContent.trim().includes('Дисциплины'));
            const discTable = q('table.table.table-striped:nth-of-type(2)');
            if (h2Disc && discTable) {
                const wrapper = document.createElement('div');
                wrapper.className = 'disciplines-header';
                wrapper.setAttribute('role', 'button');
                wrapper.setAttribute('tabindex', '0');
                wrapper.setAttribute('aria-expanded', 'true');
                wrapper.setAttribute('aria-controls', 'disciplines-table');

                const btn = document.createElement('span');
                btn.className = 'menu-toggle';
                btn.textContent = '☰';

                wrapper.append(btn, ' Дисциплины');

                h2Disc.replaceWith(wrapper);
                discTable.id = 'disciplines-table';

                let isHidden = localStorage.getItem('discHidden') === 'true';
                if (isHidden) {
                    discTable.classList.add('hidden');
                    btn.classList.add('rotated');
                    wrapper.setAttribute('aria-expanded', 'false');
                }

                const toggle = () => {
                    isHidden = !isHidden;
                    discTable.classList.toggle('hidden', isHidden);
                    btn.classList.toggle('rotated', isHidden);
                    wrapper.setAttribute('aria-expanded', String(!isHidden));
                    localStorage.setItem('discHidden', String(isHidden));
                };

                wrapper.onclick = toggle;
                wrapper.addEventListener('keydown', e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggle();
                    }
                });
            }

            // 7. Шестерёнка и меню
            const navbarRight = q('.navbar-nav.navbar-right');
            if (navbarRight) {
                const gearLi = document.createElement('li');
                const gearLink = document.createElement('a');
                gearLink.href = '#';
                gearLink.textContent = '⚙️';
                gearLink.setAttribute('role', 'button');
                gearLink.setAttribute('aria-label', 'Открыть настройки');
                gearLi.appendChild(gearLink);

                const exitLi = q('li:last-child', navbarRight);
                navbarRight.insertBefore(gearLi, exitLi);

                // Создаём overlay
                const overlay = document.createElement('div');
                overlay.className = 'settings-overlay';
                document.body.appendChild(overlay);

                // Создаём меню
                const menu = document.createElement('div');
                menu.id = 'settings-menu';
                menu.innerHTML = `
                    <h4>Настройки</h4>
                    <div class="switch-container" id="theme-switch-container">
                        <div class="switch" id="theme-switch"></div>
                        <span class="switch-label">Тёмная тема</span>
                    </div>
                `;
                document.body.appendChild(menu);

                const switchEl = q('#theme-switch', menu);
                if (switchEl) {
                    let theme = localStorage.getItem('theme') || 'light';
                    document.body.setAttribute('data-theme', theme);
                    if (theme === 'dark') switchEl.classList.add('checked');

                    const toggleTheme = () => {
                        const isDark = !switchEl.classList.contains('checked');
                        switchEl.classList.toggle('checked', isDark);
                        theme = isDark ? 'dark' : 'light';
                        document.body.setAttribute('data-theme', theme);
                        localStorage.setItem('theme', theme);
                    };

                    switchEl.onclick = toggleTheme;
                    q('#theme-switch-container', menu).onclick = toggleTheme;
                }

                gearLink.onclick = e => {
                    e.preventDefault();
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                    overlay.style.display = menu.style.display === 'block' ? 'block' : 'none';
                };

                // Закрытие по клику вне или Escape
                document.addEventListener('click', e => {
                    if (!menu.contains(e.target) && e.target !== gearLink && !overlay.contains(e.target)) {
                        menu.style.display = 'none';
                        overlay.style.display = 'none';
                    }
                });

                document.addEventListener('keydown', e => {
                    if (e.key === 'Escape') {
                        menu.style.display = 'none';
                        overlay.style.display = 'none';
                    }
                });
            }
        } catch (err) {
            console.warn('[FGOUPSKEnhancer] Ошибка:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();