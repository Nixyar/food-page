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

export default calculator;
