import {closePopup} from './popup';
import {postData} from '../services/services';

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

    function thanksModal(message) {
        document.querySelector('.form-popup').classList.add('hide');
        thanksContent.style.textAlign = 'center';
        thanksContent.innerHTML = `<h2>${message}</h2>`;

        document.querySelector('.modal__content').append(thanksContent);

        setTimeout(() => {
            closePopup();
            thanksContent.remove();
            document.querySelector('.form-popup').classList.remove('hide');
        }, 3000)
    }
}

export default sendForm;
