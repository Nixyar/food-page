function tabs({tabContentSelector, tabBlockItemsSelector, tabItemSelector, tabActiveClass}) {
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

export default tabs;
