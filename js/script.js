"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector("body"),
        tabBlockItems = document.querySelector('.tabheader__items'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabItem = document.querySelectorAll('.tabheader__item');

    body.style.width = '100%';

    function hideContentTabs() {
        tabContent.forEach((evt) => {
            evt.classList.add('hide');
        });

        tabItem.forEach((evt) => {
            evt.classList.remove('tabheader__item_active')
        });
    }

    function showContentTabs(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabItem[i].classList.add('tabheader__item_active')
    }

    hideContentTabs();
    showContentTabs();

    tabBlockItems.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabItem.forEach((item, i) => {
                if (target === item) {
                    hideContentTabs();
                    showContentTabs(i);
                }
            })
        }
    });

    // TIMER

    let timer;

    const endDateTime = new Date('2020-11-18');

    document.querySelector('#promoDate').innerHTML = `${endDateTime.getDay()} ${getMonthName()} ${endDateTime.getFullYear()}`;

    const days = document.querySelector('#days');
    const hours = document.querySelector('#hours');
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');

    function updateTimer() {
        timer = setInterval(getDate, 1000);
    }

    function getMonthName() {
        if (endDateTime.getMonth() === 0) {
            return 'января'
        } else if (endDateTime.getMonth() === 1) {
            return 'февраля'
        } else if (endDateTime.getMonth() === 2) {
            return 'марта'
        } else if (endDateTime.getMonth() === 3) {
            return 'апреля'
        } else if (endDateTime.getMonth() === 4) {
            return 'мая'
        } else if (endDateTime.getMonth() === 5) {
            return 'июня'
        } else if (endDateTime.getMonth() === 6) {
            return 'июля'
        } else if (endDateTime.getMonth() === 7) {
            return 'августа'
        } else if (endDateTime.getMonth() === 8) {
            return 'сентября'
        } else if (endDateTime.getMonth() === 9) {
            return 'октября'
        } else if (endDateTime.getMonth() === 10) {
            return 'ноября'
        } else if (endDateTime.getMonth() === 11) {
            return 'декабря'
        }
    }

    function addZero(num) {
        if (num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }

    function getDate() {
        let nowDate = endDateTime - new Date();

        const d = Math.floor(nowDate / (1000 * 60 * 60 * 24));
        const h = Math.floor(nowDate / (1000 * 60 * 60) % 24);
        const m = Math.floor(nowDate / 1000 / 60 % 60);
        const s = Math.floor(nowDate / 1000 % 60);

        days.innerHTML = `${addZero(d)}`;
        hours.innerHTML = `${addZero(h)}`;
        minutes.innerHTML = `${addZero(m)}`;
        seconds.innerHTML = `${addZero(s)}`;

        if (nowDate <= 0) {
            days.innerHTML = `${addZero(0)}`;
            hours.innerHTML = `${addZero(0)}`;
            minutes.innerHTML = `${addZero(0)}`;
            seconds.innerHTML = `${addZero(0)}`;
            clearInterval(timer);
        }
    }

    updateTimer();
    getDate();

    // POPUP

    const openPopupItem = document.querySelectorAll('[data-popupOpen="true"]'),
        popup = document.querySelector('.modal'),
        closePopupItem = document.querySelectorAll('[data-popupClose="true"]');

    function closePopup() {
        body.style.position = 'relative';
        popup.classList.add('hide');
        popup.classList.remove('show');
    }

    openPopupItem.forEach((item) => {
        item.addEventListener('click', () => {
            body.style.position = 'fixed';
            popup.classList.add('show');
            popup.classList.remove('hide');
        });
    });

    closePopupItem.forEach((item) => {
        item.addEventListener('click', () => {
            closePopup();
        });
    });

    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('modal')) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && popup.classList.contains('show')) {
            closePopup();
        }
    });
});
