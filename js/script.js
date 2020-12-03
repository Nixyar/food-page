import calculator from './modules/calculator';
import cards from './modules/cards';
import popup from './modules/popup';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import sendForm from './modules/sendForm';

document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'http://localhost:3000';

    calculator('.calculating__result span');
    cards(baseURL);
    popup('.modal__dialog');
    slider({
        sliderContainerSelector:'.offer__slider-wrapper',
        slidersBlockSelector: '.offer__slider-inner',
        slidersSelector: '.offer__slide',
        prevSlideSelector: '.offer__slider-prev',
        nextSlideSelector: '.offer__slider-next',
        currentSlideSelector: '#current',
        totalSlideSelector: '#total',
    });
    tabs('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    timer(timer, new Date('2021-01-01'));
    sendForm(baseURL, 'form', '.modal__dialog');
});
