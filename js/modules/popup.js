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

export default popup;
export {closePopup};