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
