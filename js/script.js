document.addEventListener('DOMContentLoaded', () => {
    const calculator = require('./modules/calculator'),
        cards = require('./modules/cards'),
        popup = require('./modules/popup'),
        sendForm = require('./modules/sendForm'),
        slider = require('./modules/slider'),
        tabs = require('./modules/tabs'),
        timer = require('./modules/timer');
    calculator();
    cards();
    popup();
    sendForm();
    slider();
    tabs();
    timer();
});
