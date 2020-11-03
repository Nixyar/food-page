"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector("body"),
        tabBlockItems = document.querySelector('.tabheader__items'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabItem = document.querySelectorAll('.tabheader__item');

    body.style.width = '100%';

    // TABS

    function hideContentTabs() {
        tabContent.forEach(evt => {
            evt.classList.add('hide');
        });

        tabItem.forEach(evt => {
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

    tabBlockItems.addEventListener('click', evt => {
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

    const endDateTime = new Date('2020-12-01');

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
        btnForm = document.querySelectorAll('.btn_form'),
        thanksContent = document.createElement('div'),
        popupContent = document.querySelector('.modal__dialog'),
        closePopupItem = document.querySelectorAll('[data-popupClose="true"]');

    function openPopup() {
        body.style.overflow = 'hidden';
        popup.classList.add('show');
        popup.classList.remove('hide');
    }

    function closePopup() {
        body.style.overflow = 'auto';
        popup.classList.add('hide');
        popup.classList.remove('show');
        thanksContent.remove();
        popupContent.classList.remove('hide');
    }

    function scrollPopup() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openPopup();
            window.removeEventListener('scroll', scrollPopup);
        }
    }

    function thanksModal(message) {
        popupContent.classList.add('hide');
        thanksContent.classList.add('modal__dialog');
        thanksContent.style.textAlign = 'center';
        thanksContent.innerHTML =
            `
                <div class="modal__content">
                    <div data-popupClose="true" class="modal__close">&times;</div>
                    <p>${message}</p>
                </div>
            `;

        document.querySelector('.modal').append(thanksContent);

        setTimeout(() => {
            closePopup();
            thanksContent.remove();
            popupContent.classList.remove('hide');
        }, 4000)
    }

    openPopupItem.forEach(item => {
        item.addEventListener('click', () => {
            openPopup();
        });
    });

    closePopupItem.forEach(item => {
        item.addEventListener('click', () => {
            closePopup();
        });
    });

    popup.addEventListener('click', evt => {
        if (evt.target.classList.contains('modal')) {
            closePopup();
        }
    });

    document.addEventListener('keydown', evt => {
        if (evt.code === 'Escape' && popup.classList.contains('show')) {
            closePopup();
        }
    });

    window.addEventListener('scroll', scrollPopup);
    setTimeout(openPopup, 50000);

    // CONSTRUCTOR MENU

    class Menu {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = +this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(item => {
                    element.classList.add(item);
                });
            }

            element.innerHTML = `
                    <img data-imgMenu="1" src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;

            this.parent.append(element);
        }
    }

    new Menu(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        `Меню "Фитнес" - это новый подход к приготовлению блюд: 
    больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой 
    и высоким качеством!`,
        9,
        '.menu .container'
    ).render();

    new Menu(
        'img/tabs/post.jpg',
        'post',
        'Меню “Постное”',
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие 
                        продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество
                        белков за счет тофу и импортных вегетарианских стейков.`,
        14,
        '.menu .container'
    ).render();

    new Menu(
        'img/tabs/elite.jpg',
        'elite',
        'Меню "Премиум"',
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.
         Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        21,
        '.menu .container'
    ).render();

    // SEND FORM

    const message = {
        complete: 'Спасибо за заявку. Мы свяжемся с вами в ближайшее время!',
        loading: 'icons/spinner.svg',
        fail: 'Произошла ошибка. Повторите попытку позже.'
    };

    const form = document.querySelectorAll('form');

    function postData(form) {
        form.addEventListener('submit', evt => {
            evt.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText =
                `
                display: block;
                margin: auto;
               `;
            form.append(statusMessage);

            const formBuild = new FormData(form);

            // JSON PARSE
            const obj = {};
            formBuild.forEach(function (value, key) {
                obj[key] = value;
            });
            // END JSON PARSE

            fetch('http://localhost:3000/requests', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(res => {
                    res.text()
                        .then(res => {
                            console.log(res);
                            thanksModal(message.complete);
                        });
                })
                .catch(() => {
                    thanksModal(message.fail);
                })
                .finally(() => {
                    statusMessage.remove();
                    form.reset();
                });
        })
    }

    form.forEach(item => {
        postData(item);
    });

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(data => console.log(data))
});
