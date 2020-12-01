function popup() {
    // POPUP

    const openPopupItem = document.querySelectorAll('[data-popupOpen="true"]'),
        popup = document.querySelector('.modal'),
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
}

module.exports = popup;
