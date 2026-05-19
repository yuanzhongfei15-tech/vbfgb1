const STORAGE_KEY = 'memorial_dates';
const POPULAR_HOLIDAYS = [
    { name: '春节', month: 1, day: 1, icon: '🧧' },
    { name: '元宵节', month: 1, day: 15, icon: '🏮' },
    { name: '情人节', month: 2, day: 14, icon: '💝' },
    { name: '妇女节', month: 3, day: 8, icon: '🌸' },
    { name: '清明节', month: 4, day: 5, icon: '🌿' },
    { name: '劳动节', month: 5, day: 1, icon: '💪' },
    { name: '青年节', month: 5, day: 4, icon: '🌟' },
    { name: '母亲节', month: 5, day: 'second-sunday', icon: '👩' },
    { name: '儿童节', month: 6, day: 1, icon: '🎈' },
    { name: '父亲节', month: 6, day: 'third-sunday', icon: '👨' },
    { name: '端午节', month: 6, day: 14, icon: '🐲' },
    { name: '七夕节', month: 8, day: 10, icon: '❤️' },
    { name: '教师节', month: 9, day: 10, icon: '📚' },
    { name: '中秋节', month: 9, day: 21, icon: '🥮' },
    { name: '国庆节', month: 10, day: 1, icon: '🇨🇳' },
    { name: '重阳节', month: 10, day: 14, icon: '🏔️' },
    { name: '平安夜', month: 12, day: 24, icon: '🎄' },
    { name: '圣诞节', month: 12, day: 25, icon: '🎁' },
    { name: '元旦', month: 1, day: 1, icon: '🎊' }
];

let currentTheme = localStorage.getItem('theme') || 'light';

function init() {
    applyTheme(currentTheme);
    renderPopularHolidays();
    renderSavedMemorials();
    setupEventListeners();
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        document.getElementById('themeToggle').querySelector('.theme-icon').textContent = '☀️';
    } else {
        document.body.classList.remove('dark');
        document.getElementById('themeToggle').querySelector('.theme-icon').textContent = '🌙';
    }
    currentTheme = theme;
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
}

function getHolidayDate(holiday) {
    const now = new Date();
    let year = now.getFullYear();
    
    if (typeof holiday.day === 'number') {
        let date = new Date(year, holiday.month - 1, holiday.day);
        if (date < now) {
            year++;
            date = new Date(year, holiday.month - 1, holiday.day);
        }
        return date;
    } else if (holiday.day === 'second-sunday') {
        return getNthSunday(year, holiday.month, 2);
    } else if (holiday.day === 'third-sunday') {
        return getNthSunday(year, holiday.month, 3);
    }
    return null;
}

function getNthSunday(year, month, n) {
    const firstDay = new Date(year, month - 1, 1);
    const firstSunday = new Date(firstDay);
    firstSunday.setDate(1 + (7 - firstDay.getDay()) % 7);
    const nthSunday = new Date(firstSunday);
    nthSunday.setDate(firstSunday.getDate() + (n - 1) * 7);
    const now = new Date();
    if (nthSunday < now) {
        return getNthSunday(year + 1, month, n);
    }
    return nthSunday;
}

function getDaysUntil(date) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    const diff = target - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(date) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function renderPopularHolidays() {
    const container = document.getElementById('holidayList');
    if (!container) return;
    
    const holidaysWithDays = POPULAR_HOLIDAYS.map(holiday => {
        const date = getHolidayDate(holiday);
        const days = getDaysUntil(date);
        return { ...holiday, date, days };
    }).sort((a, b) => a.days - b.days).slice(0, 6);
    
    container.innerHTML = holidaysWithDays.map(holiday => `
        <div class="holiday-item">
            <div class="holiday-info">
                <div class="holiday-name">${holiday.icon} ${holiday.name}</div>
                <div class="holiday-date">${formatDate(holiday.date)}</div>
            </div>
            <div class="holiday-countdown">
                <div class="countdown-number">${holiday.days}</div>
                <div class="countdown-text">${holiday.days === 0 ? '今天！' : holiday.days === 1 ? '明天' : '天后'}</div>
            </div>
        </div>
    `).join('');
}

function getSavedMemorials() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveMemorials(memorials) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memorials));
}

function addMemorial(memorial) {
    const memorials = getSavedMemorials();
    memorials.push({ ...memorial, id: Date.now() });
    saveMemorials(memorials);
    renderSavedMemorials();
}

function deleteMemorial(id) {
    let memorials = getSavedMemorials();
    memorials = memorials.filter(m => m.id !== id);
    saveMemorials(memorials);
    renderSavedMemorials();
}

function renderSavedMemorials() {
    const container = document.getElementById('memorialList');
    if (!container) return;
    
    const memorials = getSavedMemorials();
    
    if (memorials.length === 0) {
        container.innerHTML = '<p class="empty">暂无保存的纪念日，快去创建吧！</p>';
        return;
    }
    
    const now = new Date();
    const sortedMemorials = memorials.map(m => {
        const date = new Date(m.date);
        const days = getDaysUntil(date);
        return { ...m, dateObj: date, days };
    }).sort((a, b) => a.days - b.days);
    
    container.innerHTML = sortedMemorials.map(m => `
        <div class="memorial-item">
            <div class="memorial-info">
                <div class="memorial-name">${getIconByType(m.type)} ${m.name}</div>
                <div class="memorial-date">${formatDate(m.dateObj)}</div>
            </div>
            <div class="memorial-countdown">
                <div class="countdown-number">${m.days >= 0 ? m.days : Math.abs(m.days)}</div>
                <div class="countdown-text">${m.days === 0 ? '今天！' : m.days > 0 ? '天后' : '天前'}</div>
            </div>
            <button class="delete-btn" onclick="deleteMemorial(${m.id})" aria-label="删除">🗑️</button>
        </div>
    `).join('');
}

function getIconByType(type) {
    const icons = {
        countdown: '⏰',
        birthday: '🎂',
        love: '💕',
        holiday: '🎉',
        other: '📌'
    };
    return icons[type] || '📌';
}

function calculateDaysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    const diff = Math.abs(d2 - d1);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function setupEventListeners() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

document.addEventListener('DOMContentLoaded', init);