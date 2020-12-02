/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function calculator() {
    const calculatorResultSpan = document.querySelector('.calculating__result span');
    let sex,
        height,
        weight,
        age,
        activity;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female')
    }

    if (localStorage.getItem('activity')) {
        activity = localStorage.getItem('activity');
    } else {
        activity = 1.375;
        localStorage.setItem('activity', '1.375')
    }

    function getLocalInfo(classActive = 'calculating__choose-item_active') {
        document.querySelectorAll('.calculating__choose-item').forEach(item => {
            item.classList.remove('calculating__choose-item_active');

            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(classActive);
            }
            if (item.getAttribute('data-activity') === localStorage.getItem('activity')) {
                item.classList.add(classActive);
            }
        });
    }

    getLocalInfo();

    function resultCalculator() {
        if (sex === 'female') {
            calculatorResultSpan.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
        } else {
            calculatorResultSpan.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
        }

        if (!height || !weight || !age) {
            calculatorResultSpan.textContent = '____'
        }
    }

    resultCalculator();

    function changeCalculatorTab(blockElem) {
        const elements = document.querySelectorAll(blockElem);

        elements.forEach(elem => {
            elem.addEventListener('click', evt => {
                const target = evt.target;

                if (target.getAttribute('data-activity')) {
                    activity = target.getAttribute('data-activity');
                    localStorage.setItem('activity', activity);
                } else {
                    sex = target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove('calculating__choose-item_active');
                });

                target.classList.add('calculating__choose-item_active');
                resultCalculator();
            });
        });
    }

    changeCalculatorTab('#gender div');
    changeCalculatorTab('.calculating__choose_big div');

    function getInputValue(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case 'height' :
                    height = +input.value;
                    break;
                case 'weight' :
                    weight = +input.value;
                    break;
                case 'age' :
                    age = +input.value;
                    break;
            }
            resultCalculator();
        });
    }

    getInputValue('#height');
    getInputValue('#weight');
    getInputValue('#age');
}

module.exports = calculator;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function cards() {
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

    // const getData = async url => {
    //     const res = await fetch(url);
    //     return await res.json();
    // };
    //
    // getData(`${baseURL}/menu`)
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new Menu(img, altimg, title, descr, price, '.menu .container').render();
    //         })
    //     });

    const baseURL = 'http://localhost:3000';

    axios.get(`${baseURL}/menu`)
        .then(data => {
            // console.log(data);
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new Menu(img, altimg, title, descr, price, '.menu .container').render();
            })
        });
}

module.exports = cards;


/***/ }),

/***/ "./js/modules/popup.js":
/*!*****************************!*\
  !*** ./js/modules/popup.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function popup() {
    const openPopupItem = document.querySelectorAll('[data-popupOpen="true"]'),
        popup = document.querySelector('.modal'),
        thanksContent = document.createElement('div'),
        popupContent = document.querySelector('.modal__dialog'),
        body = document.querySelector("body"),
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
}

module.exports = popup;


/***/ }),

/***/ "./js/modules/sendForm.js":
/*!********************************!*\
  !*** ./js/modules/sendForm.js ***!
  \********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function sendForm() {
    const baseURL = 'http://localhost:3000';

    const form = document.querySelectorAll('form');

    const message = {
        complete: 'Спасибо за заявку. Мы свяжемся с вами в ближайшее время!',
        loading: 'icons/spinner.svg',
        fail: 'Произошла ошибка. Повторите попытку позже.'
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    form.forEach(item => {
        postDataForm(item);
    });

    function postDataForm(form) {
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
            const json = JSON.stringify(Object.fromEntries(formBuild.entries()));

            postData(`${baseURL}/requests`, json)
                .then(res => {
                    console.log(res);
                    thanksModal(message.complete);
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
}

module.exports = sendForm;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function slider() {
    // Easy SLIDER
    // let slideNumber = 0;
    //
    // const slidersBlock = document.querySelectorAll('.offer__slide'),
    //     prevSlide = document.querySelector('.offer__slider-prev'),
    //     nextSlide = document.querySelector('.offer__slider-next'),
    //     sliderCurrent = document.querySelector('#current'),
    //     slidersTotal = document.querySelector('#total');
    //
    // slidersTotal.textContent = `${addZero(slidersBlock.length)}`;
    //
    // function initSlider() {
    //     slidersBlock.forEach((item) => {
    //         item.style.display = 'none';
    //     });
    //
    //     if (slideNumber > 3) {
    //         slideNumber = 0;
    //     }
    //
    //     if (slideNumber < 0) {
    //         slideNumber = 3;
    //     }
    //
    //     sliderCurrent.textContent = `${addZero(slideNumber + 1)}`;
    //     slidersBlock[slideNumber].style.display = 'block';
    //     slidersBlock[slideNumber].classList.add('fade');
    // }
    //
    // prevSlide.addEventListener('click', evt => {
    //     evt.preventDefault();
    //     slideNumber -= 1;
    //     initSlider();
    // });
    //
    // nextSlide.addEventListener('click', evt => {
    //     evt.preventDefault();
    //     slideNumber += 1;
    //     initSlider();
    // });
    //
    // initSlider();

    // Hard SLIDER
    let slideNumber = 0;
    let offset = 0;
    const regExpPx = /\D/g;

    const sliders = document.querySelectorAll('.offer__slide'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next'),
        sliderContainer = document.querySelector('.offer__slider-wrapper'),
        slidersBlock = document.querySelector('.offer__slider-inner'),
        sliderCurrent = document.querySelector('#current'),
        slidersTotal = document.querySelector('#total'),
        sliderWidth = window.getComputedStyle(sliderContainer).width;

    const paginationBlock = document.createElement('ol'),
        dots = [];

    sliderContainer.style.position = 'relative';
    sliderContainer.style.width = sliderWidth;
    sliderContainer.style.overflow = 'hidden';
    slidersBlock.style.display = 'flex';
    slidersBlock.style.width = 100 * sliders.length + '%';
    slidersBlock.style.transition = '0.5s all';
    slidersTotal.textContent = `${addZero(sliders.length)}`;
    sliderCurrent.textContent = `${addZero(slideNumber + 1)}`;
    paginationBlock.classList.add('carousel-indicators');
    document.querySelector('.offer__slider-wrapper').append(paginationBlock);

    sliders.forEach(item => {
        item.style.width = sliderWidth;
    });

    for (let i = 0; i < sliders.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i);
        dot.classList.add('dot');
        paginationBlock.append(dot);
        dots.push(dot);
    }

    function addZero(num) {
        if (num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }

    function deleteNotDigits(arg) {
        return arg.replace(regExpPx, '');
    }

    function slideActive() {
        sliderCurrent.textContent = `${addZero(slideNumber + 1)}`;
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideNumber].style.opacity = '1';
    }

    nextSlide.addEventListener('click', () => {
        slideNumber++;
        if (slideNumber > 3) {
            slideNumber = 0;
        }
        offset = deleteNotDigits(sliderWidth) * slideNumber;
        slidersBlock.style.transform = `translateX(-${offset}px)`;
        slideActive();
    });

    prevSlide.addEventListener('click', () => {
        slideNumber--;
        if (slideNumber < 0) {
            slideNumber = 3;
        }
        offset = -deleteNotDigits(sliderWidth) * slideNumber;
        slidersBlock.style.transform = `translateX(${offset}px)`;
        slideActive();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', evt => {
            const slideTo = evt.target.getAttribute('data-slide-to');
            slideNumber = +slideTo;
            offset = -deleteNotDigits(sliderWidth) * slideTo;
            slidersBlock.style.transform = `translateX(${offset}px)`;
            slideActive();
        })
    });

    dots[0].style.opacity = '1';
}

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function tabs() {
    const body = document.querySelector("body"),
        tabBlockItems = document.querySelector('.tabheader__items'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabItem = document.querySelectorAll('.tabheader__item');

    body.style.width = '100%';

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
}

module.exports = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 79:0-14 */
/***/ ((module) => {

function timer() {
    let timer;

    const endDateTime = new Date('2021-01-01');

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
}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
document.addEventListener('DOMContentLoaded', () => {
    const calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        popup = __webpack_require__(/*! ./modules/popup */ "./js/modules/popup.js"),
        sendForm = __webpack_require__(/*! ./modules/sendForm */ "./js/modules/sendForm.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
    calculator();
    cards();
    popup();
    sendForm();
    slider();
    tabs();
    timer();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map