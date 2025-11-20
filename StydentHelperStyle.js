// ==UserScript==
// @name         Student Helper Style
// @namespace    https://github.com/AbrikosV/StudentHelperStyle
// @version      1.4.0
// @description  Улучшенный интерфейс расписания для студентов колледжа
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

    // === 🛑 Защита от дублей и запуска на странице входа ===
    const SCRIPT_ID = 'student-helper-stylett-v1.4';
    if (document.getElementById(SCRIPT_ID)) return;

    // На странице входа — только "регистрация" и "вход"
    if (
        document.body.textContent.includes('регистрация') &&
        document.body.textContent.includes('вход') &&
        !document.querySelector('table, input[name="d"]')
    ) {
        return;
    }

    const marker = document.createElement('meta');
    marker.id = SCRIPT_ID;
    document.head.appendChild(marker);

    // === 🎨 СТИЛИ ===
    const style = document.createElement('style');
    style.textContent = `
        /* ===== ГЛОБАЛЬНЫЕ СТИЛИ ===== */
        .shs-enhanced body {
            background: #fafafa !important;
            color: #2c3e50 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
            line-height: 1.5 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .shs-enhanced > :not(script):not(style):not(head):not(meta):not(title) {
            max-width: 1200px !important;
            margin: 20px auto !important;
            padding: 0 16px !important;
        }

        /* ===== ФОРМА ДАТЫ ===== */
        .shs-enhanced .form-inline {
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

        .shs-enhanced input[name="d"] {
            flex: 1 !important;
            padding: 8px 12px !important;
            border: 1px solid #ced4da !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            color: #495057 !important;
        }

        .shs-enhanced input[name="d"]:focus {
            outline: none !important;
            border-color: #007bff !important;
            box-shadow: 0 0 0 2px rgba(0,123,255,0.1) !important;
        }

        .shs-enhanced .btn-primary[type="submit"] {
            background: #007bff !important;
            border: none !important;
            color: white !important;
            padding: 8px 16px !important;
            border-radius: 6px !important;
            cursor: pointer !important;
            transition: background 0.2s !important;
        }

        .shs-enhanced .btn-primary[type="submit"]:hover {
            background: #0056b3 !important;
        }

        /* ===== КНОПКИ ДАТЫ ===== */
        .shs-enhanced .date-controls {
            display: inline-flex !important;
            gap: 6px !important;
            margin-left: 8px !important;
        }

        .shs-enhanced .date-controls button {
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

        .shs-enhanced .date-controls button:hover {
            background: #f1f3f5 !important;
            transform: translateY(-1px);
        }

        /* ===== ТАБЛИЦА ===== */
        .shs-enhanced table.table {
            width: 100% !important;
            border-collapse: collapse !important;
            border-radius: 8px !important;
            overflow: hidden !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
            background: white !important;
            margin: 20px 0 !important;
        }

        .shs-enhanced table.table thead th {
            background: #f8f9fa !important;
            color: #495057 !important;
            font-weight: 600 !important;
            padding: 12px 16px !important;
            text-align: left !important;
            border-bottom: 2px solid #dee2e6 !important;
        }

        .shs-enhanced table.table tbody tr {
            border-bottom: 1px solid #f1f3f5 !important;
        }

        .shs-enhanced table.table tbody tr:last-child {
            border-bottom: none !important;
        }

        .shs-enhanced table.table tbody tr:hover {
            background: #f8f9fa !important;
        }

        .shs-enhanced table.table td {
            padding: 12px 16px !important;
            color: #212529 !important;
            vertical-align: top !important;
        }

        /* ===== ЗАГОЛОВКИ ===== */
        .shs-enhanced h2 {
            font-size: 1.4rem !important;
            font-weight: 600 !important;
            color: #2c3e50 !important;
            margin: 24px 0 12px 0 !important;
            padding-bottom: 6px !important;
            border-bottom: 2px solid #007bff !important;
        }

        /* ===== БЛОК ДИСЦИПЛИН ===== */
        .shs-enhanced .disciplines-header {
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

        .shs-enhanced .disciplines-header:hover {
            background: #e9ecef !important;
        }

        .shs-enhanced .menu-toggle {
            font-size: 1.2rem !important;
            color: #6c757d !important;
            transition: transform 0.3s ease !important;
        }

        .shs-enhanced .menu-toggle.rotated {
            transform: rotate(180deg) !important;
        }

        .shs-enhanced #disciplines-table {
            margin-top: 12px !important;
            transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease !important;
            overflow: hidden !important;
        }

        .shs-enhanced #disciplines-table.hidden {
            max-height: 0 !important;
            opacity: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
        }

        /* ===== КОМПАКТНОЕ МЕНЮ НАСТРОЕК (под шестерёнкой) ===== */
        .shs-enhanced .settings-menu {
            position: absolute;
            background: white !important;
            border: 1px solid #dee2e6 !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
            padding: 12px !important;
            z-index: 9999;
            display: none;
            min-width: 200px;
            font-size: 14px;
            font-weight: 500;
        }

        .shs-enhanced .settings-menu .header {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
            text-align: center;
        }

        .shs-enhanced .settings-menu .switch-row {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            padding: 6px 8px;
            border-radius: 4px;
        }

        .shs-enhanced .settings-menu .switch-row:hover {
            background: #f8f9fa;
        }

        .shs-enhanced .settings-menu .label {
            color: #2c3e50;
            margin: 0;
        }

        .shs-enhanced .settings-menu .switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
            border-radius: 20px;
            background: #e0e0e0;
            flex-shrink: 0;
        }

        .shs-enhanced .settings-menu .switch::before {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            transition: transform 0.2s;
        }

        .shs-enhanced .settings-menu .switch.checked {
            background: #007bff;
        }

        .shs-enhanced .settings-menu .switch.checked::before {
            transform: translateX(20px);
        }

        /* ===== ТЁМНАЯ ТЕМА ===== */
        .shs-enhanced [data-theme="dark"] body {
            background: #0f0f12 !important;
            color: #e6e6e6 !important;
        }

        .shs-enhanced [data-theme="dark"] .form-inline,
        .shs-enhanced [data-theme="dark"] table.table,
        .shs-enhanced [data-theme="dark"] .disciplines-header {
            background: #1e1e1e !important;
            border-color: #333 !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
        }

        .shs-enhanced [data-theme="dark"] table.table thead th {
            background: #2a2a2a !important;
            border-bottom-color: #444 !important;
        }

        .shs-enhanced [data-theme="dark"] table.table tbody tr {
            border-bottom-color: #333 !important;
        }

        .shs-enhanced [data-theme="dark"] table.table tbody tr:hover {
            background: #252525 !important;
        }

        .shs-enhanced [data-theme="dark"] input[name="d"] {
            background: #2a2a2a !important;
            border-color: #444 !important;
            color: #e6e6e6 !important;
        }

        .shs-enhanced [data-theme="dark"] .date-controls button,
        .shs-enhanced [data-theme="dark"] .btn-primary[type="submit"] {
            background: #2a2a2a !important;
            border-color: #444 !important;
            color: #e6e6e6 !important;
        }

        .shs-enhanced [data-theme="dark"] .date-controls button:hover {
            background: #333 !important;
        }

        .shs-enhanced [data-theme="dark"] h2 {
            color: #ffffff !important;
            border-bottom-color: #007bff !important;
        }

        .shs-enhanced [data-theme="dark"] .disciplines-header {
            background: #2a2a2a !important;
        }

        /* Тёмная тема — меню */
        .shs-enhanced [data-theme="dark"] .settings-menu {
            background: #1e1e1e !important;
            border-color: #333 !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
        }

        .shs-enhanced [data-theme="dark"] .settings-menu .header,
        .shs-enhanced [data-theme="dark"] .settings-menu .label {
            color: #e6e6e6 !important;
        }

        .shs-enhanced [data-theme="dark"] .settings-menu .switch {
            background: #555 !important;
        }

        .shs-enhanced [data-theme="dark"] .settings-menu .switch.checked {
            background: #4a86e8 !important;
        }
    `;
    document.head.appendChild(style);

    // === 🧰 ХЕЛПЕРЫ ===
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    const formatDate = d => {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        return `${dd}.${mm}.${d.getFullYear()}`;
    };

    const parseDate = str => {
        const [d, m, y] = str.split('.').map(Number);
        return new Date(y, m - 1, d);
    };

    // === 📦 КЕШИРОВАНИЕ DOM ===
    const DOM = {
        dateInput: null,
        searchBtn: null,
        tables: [],
        navbarRight: null,
        h2s: [],
        init() {
            this.dateInput = $('input[name="d"]');
            this.searchBtn = $('.btn-primary[type="submit"]');
            this.tables = $$('table.table.table-striped');
            this.navbarRight = $('.navbar-nav.navbar-right');
            this.h2s = $$('h2');
            return this.dateInput && this.searchBtn;
        }
    };

    // === МОДУЛИ ===
    const modules = {
        uiCleanup() {
    // Удаляем "Расписание" и <hr>
    const h2Schedule = DOM.h2s.find(h => /расписан/i.test(h.textContent));
    if (h2Schedule) {
        h2Schedule.remove();
        const nextHR = h2Schedule.nextElementSibling;
        if (nextHR?.tagName === 'HR') nextHR.remove();
    }
    // Удаляем "полное расписание"
    const fullLink = $('a[href*="page=r"]');
    if (fullLink) fullLink.remove();

    // ✅ ИСПРАВЛЕНИЕ: обновляем ссылку "Группа"
    const groupLink = $('a[href*="act=group"]:not([href*="act2="])');
    if (groupLink) {
        try {
            const url = new URL(groupLink.href, location.origin);
            // Убеждаемся, что в URL есть m=... (обычно есть)
            // Просто добавляем/заменяем act2=prog
            url.searchParams.set('act2', 'prog');

            groupLink.href = url.toString();
            groupLink.title = 'Программа обучения группы';
            // (опционально) можно заменить текст, но лучше оставить "Группа"
            // groupLink.textContent = 'Программа группы';
        } catch (e) {
            console.warn('[StudentHelperStyleTT] Не удалось обновить ссылку "Группа":', e);
        }
    }
},
        
        dateNavigation() {
            const ctrl = document.createElement('div');
            ctrl.className = 'date-controls';

            ['←', '🏠', '→'].forEach((txt, i) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = txt;
                btn.title = i === 0 ? 'Предыдущий день' :
                           i === 1 ? 'Сегодня' :
                           'Следующий день';

                btn.onclick = () => {
                    const d = parseDate(DOM.dateInput.value);
                    d.setDate(d.getDate() + (i === 0 ? -1 : i === 2 ? 1 : 0));
                    if (i === 1) d.setTime(Date.now());
                    DOM.dateInput.value = formatDate(d);

                    const form = DOM.dateInput.closest('form');
                    if (form) {
                        form.dispatchEvent(new Event('submit', { bubbles: true }));
                    } else {
                        window.location.search = `?mode=ucheba&d=${encodeURIComponent(DOM.dateInput.value)}`;
                    }
                };

                ctrl.appendChild(btn);
            });

            DOM.searchBtn.parentNode.insertBefore(ctrl, DOM.searchBtn.nextSibling);

            DOM.dateInput.addEventListener('keydown', e => {
                if (e.ctrlKey && e.key === 'Enter') {
                    e.preventDefault();
                    DOM.searchBtn.click();
                }
            });
        },

        disciplineLinks: {
            map: new Map(),
            init() {
                if (DOM.tables.length < 2) return;
                const [, discTable] = DOM.tables;
                this.map.clear();
                $$('tbody tr', discTable).forEach(tr => {
                    const a = $('td:nth-child(2) a[href]', tr);
                    if (a) this.map.set(a.textContent.trim(), a.href);
                });
            },
            apply() {
                if (DOM.tables.length < 1) return;
                const [schedTable] = DOM.tables;
                $$('tbody tr', schedTable).forEach(tr => {
                    const td = $('td:nth-child(2)', tr);
                    if (!td) return;
                    const name = td.textContent.trim();
                    const href = this.map.get(name);
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
        },

        disciplinesToggler() {
            const h2Disc = DOM.h2s.find(h => /дисциплин/i.test(h.textContent));
            const discTable = DOM.tables[1];
            if (!h2Disc || !discTable) return;

            modules.disciplineLinks.init();
            modules.disciplineLinks.apply();

            const wrapper = document.createElement('div');
            wrapper.className = 'disciplines-header';
            wrapper.tabIndex = 0;
            wrapper.setAttribute('role', 'button');
            wrapper.setAttribute('aria-expanded', 'true');
            wrapper.setAttribute('aria-controls', 'disciplines-table');
            wrapper.innerHTML = '<span class="menu-toggle">☰</span> Дисциплины';
            h2Disc.replaceWith(wrapper);
            discTable.id = 'disciplines-table';

            let isHidden = localStorage.getItem('shs-disc-hidden') === 'true';
            if (isHidden) {
                discTable.classList.add('hidden');
                wrapper.querySelector('.menu-toggle').classList.add('rotated');
                wrapper.setAttribute('aria-expanded', 'false');
            }

            wrapper.onclick = wrapper.onkeydown = e => {
                if (e.type === 'keydown' && !['Enter', ' '].includes(e.key)) return;
                e.preventDefault();

                isHidden = !isHidden;
                discTable.classList.toggle('hidden', isHidden);
                wrapper.querySelector('.menu-toggle').classList.toggle('rotated', isHidden);
                wrapper.setAttribute('aria-expanded', String(!isHidden));
                localStorage.setItem('shs-disc-hidden', String(isHidden));
            };
        },

        settingsMenu: {
            menu: null,
            init() {
                if (!DOM.navbarRight) return;

                // Создаём компактное меню
                this.menu = document.createElement('div');
                this.menu.className = 'settings-menu';
                this.menu.innerHTML = `
                    <div class="header">Настройки</div>
                    <div class="switch-row" id="theme-row">
                        <div class="switch" id="theme-switch"></div>
                        <span class="label">Тёмная тема</span>
                    </div>
                `;
                document.body.appendChild(this.menu);

                // Шестерёнка
                const gearLi = document.createElement('li');
                const gearLink = document.createElement('a');
                gearLink.href = '#';
                gearLink.textContent = '⚙️';
                gearLink.setAttribute('aria-label', 'Настройки');
                gearLink.setAttribute('role', 'button');
                gearLi.appendChild(gearLink);

                const exitLi = $('li:last-child', DOM.navbarRight);
                if (exitLi) DOM.navbarRight.insertBefore(gearLi, exitLi);
                else DOM.navbarRight.appendChild(gearLi);

                // Тема
                let theme = localStorage.getItem('shs-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.body.setAttribute('data-theme', theme);
                if (theme === 'dark') $('#theme-switch', this.menu).classList.add('checked');

                // Переключение
                const toggleTheme = () => {
                    const el = $('#theme-switch', this.menu);
                    const isDark = !el.classList.contains('checked');
                    el.classList.toggle('checked', isDark);
                    theme = isDark ? 'dark' : 'light';
                    document.body.setAttribute('data-theme', theme);
                    localStorage.setItem('shs-theme', theme);
                };

                $('#theme-row', this.menu).onclick = toggleTheme;

                // Показ/скрытие
                gearLink.onclick = e => {
                    e.preventDefault();
                    const show = this.menu.style.display !== 'block';
                    this.menu.style.display = show ? 'block' : 'none';

                    if (show) {
                        const rect = gearLink.getBoundingClientRect();
                        this.menu.style.top = `${rect.bottom + 6}px`;
                        this.menu.style.left = `${rect.left - 40}px`; // смещение влево
                        this.menu.style.transform = 'translateX(-50%)';
                    }
                };

                // Закрытие по клику вне
                document.addEventListener('click', e => {
                    if (!this.menu.contains(e.target) && e.target !== gearLink) {
                        this.menu.style.display = 'none';
                    }
                });

                // По Escape
                document.addEventListener('keydown', e => {
                    if (e.key === 'Escape') this.menu.style.display = 'none';
                });
            }
        }
    };

    // === 🚀 ЗАПУСК ===
    function main() {
        if (!DOM.init()) return;

        document.body.classList.add('shs-enhanced');

        try {
            modules.uiCleanup();
            modules.dateNavigation();
            modules.disciplinesToggler();
            modules.settingsMenu.init();
        } catch (err) {
            console.warn('[StudentHelperStyleTT] Ошибка:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();