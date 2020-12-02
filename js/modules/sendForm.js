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
