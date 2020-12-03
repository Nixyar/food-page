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

export default slider;
