"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const tabBlockItems = document.querySelector('.tabheader__items'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabItem = document.querySelectorAll('.tabheader__item');

    function hideContentTabs() {
        tabContent.forEach((evt) => {
            evt.classList.add('hide');
        });

        tabItem.forEach((evt) => {
            evt.classList.remove('tabheader__item_active')
        });
    }

    function showContentTabs(i=0) {
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
    })
});
