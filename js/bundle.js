/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calculator(calculatorResultSelector) {
    const calculatorResultSpan = document.querySelector(calculatorResultSelector);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(baseURL) {
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

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)(`${baseURL}/menu`)
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Menu(img, altimg, title, descr, price, '.menu .container').render();
            })
        });


    // axios.get(`${baseURL}/menu`)
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new Menu(img, altimg, title, descr, price, '.menu .container').render();
    //         })
    //     });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/popup.js":
/*!*****************************!*\
  !*** ./js/modules/popup.js ***!
  \*****************************/
/*! namespace exports */
/*! export closePopup [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closePopup": () => /* binding */ closePopup
/* harmony export */ });
function closePopup(modalDialog) {
    const popup = document.querySelector('.modal'),
        body = document.querySelector('body');

    body.style.overflow = 'auto';
    popup.classList.add('hide');
    popup.classList.remove('show');
}

function popup(modalDialog) {
    const popup = document.querySelector('.modal'),
        body = document.querySelector('body');

    function scrollPopup() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openPopup();
            window.removeEventListener('scroll', scrollPopup);
        }
    }

    function openPopup() {
        body.style.overflow = 'hidden';
        popup.classList.add('show');
        popup.classList.remove('hide');
        clearTimeout(timer);
    }

    document.querySelectorAll('[data-popupOpen="true"]').forEach(item => {
        item.addEventListener('click', () => {
            openPopup();
        });
    });

    document.querySelectorAll(`${modalDialog} .modal__close`).forEach(item => {
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
    let timer = setTimeout(openPopup, 400000);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (popup);


/***/ }),

/***/ "./js/modules/sendForm.js":
/*!********************************!*\
  !*** ./js/modules/sendForm.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup */ "./js/modules/popup.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function sendForm(baseURL, formSelector, modalDialog) {
    const form = document.querySelectorAll(formSelector),
        thanksContent = document.createElement('div');

    const message = {
        complete: 'Спасибо за заявку. Мы свяжемся с вами в ближайшее время!',
        loading: 'icons/spinner.svg',
        fail: 'Произошла ошибка. Повторите попытку позже.'
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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(`${baseURL}/requests`, json)
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

    function thanksModal(message) {
        document.querySelector('.form-popup').classList.add('hide');
        thanksContent.style.textAlign = 'center';
        thanksContent.innerHTML = `<h2>${message}</h2>`;

        document.querySelector('.modal__content').append(thanksContent);

        setTimeout(() => {
            (0,_popup__WEBPACK_IMPORTED_MODULE_0__.closePopup)();
            thanksContent.remove();
            document.querySelector('.form-popup').classList.remove('hide');
        }, 3000)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider({
                    sliderContainerSelector,
                    slidersSelector,
                    slidersBlockSelector,
                    nextSlideSelector,
                    prevSlideSelector,
                    currentSlideSelector,
                    totalSlideSelector
}) {
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

    const sliders = document.querySelectorAll(slidersSelector),
        prevSlide = document.querySelector(prevSlideSelector),
        nextSlide = document.querySelector(nextSlideSelector),
        sliderContainer = document.querySelector(sliderContainerSelector),
        slidersBlock = document.querySelector(slidersBlockSelector),
        sliderCurrent = document.querySelector(currentSlideSelector),
        slidersTotal = document.querySelector(totalSlideSelector),
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabContentSelector, tabBlockItemsSelector, tabItemSelector, tabActiveClass) {
    const body = document.querySelector("body"),
        tabBlockItems = document.querySelector(tabBlockItemsSelector),
        tabContent = document.querySelectorAll(tabContentSelector),
        tabItem = document.querySelectorAll(tabItemSelector);

    body.style.width = '100%';

    function hideContentTabs() {
        tabContent.forEach(evt => {
            evt.classList.add('hide');
        });

        tabItem.forEach(evt => {
            evt.classList.remove(tabActiveClass)
        });
    }

    function showContentTabs(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabItem[i].classList.add(tabActiveClass)
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(timer, endDateTime) {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/popup */ "./js/modules/popup.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_sendForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/sendForm */ "./js/modules/sendForm.js");








document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'http://localhost:3000';

    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__.default)('.calculating__result span');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)(baseURL);
    (0,_modules_popup__WEBPACK_IMPORTED_MODULE_2__.default)('.modal__dialog');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.default)({
        sliderContainerSelector:'.offer__slider-wrapper',
        slidersBlockSelector: '.offer__slider-inner',
        slidersSelector: '.offer__slide',
        prevSlideSelector: '.offer__slider-prev',
        nextSlideSelector: '.offer__slider-next',
        currentSlideSelector: '#current',
        totalSlideSelector: '#total',
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_4__.default)('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__.default)(_modules_timer__WEBPACK_IMPORTED_MODULE_5__.default, new Date('2021-01-01'));
    (0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_6__.default)(baseURL, 'form', '.modal__dialog');
});


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! namespace exports */
/*! export getData [provided] [no usage info] [missing usage info prevents renaming] */
/*! export postData [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getData": () => /* binding */ getData
/* harmony export */ });
async function getData(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Bad get data menu for error ${res.status}`)
    }

    return await res.json();
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map