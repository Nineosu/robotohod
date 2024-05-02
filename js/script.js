document.addEventListener('DOMContentLoaded', () => {
    // modals
    const modals = document.querySelectorAll('.modal'),
          modalBtns = document.querySelectorAll('.modal-btn');

    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => {
                if (btn.getAttribute('data-modal') == modal.getAttribute('data-modal')) {
                    modal.classList.add('show');
                }
            });
        });
    });
    
    modals.forEach(modal => {
        closeBtn = modal.querySelector('.modal__close');

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    });

    // cookie
    const cookieNotification = document.querySelector('.cookie__notification'),
          cookieBtn = cookieNotification.querySelector('.cookie__notification-btn');

    cookieBtn.addEventListener('click', () => {
        cookieNotification.style.display = 'none';
    });

    // burger
    const burger = document.querySelector('.modal-burger'),
          burgerLinks = burger.querySelectorAll('.nav__list-item');

    burgerLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('show');
        });
    });

    // sliders
    const whySlider = new Swiper('.why-slider', {
        slidesPerView: 1,
        spaceBetween: 20,

        breakpoints: {
            768: {
                slidesPerView: 3
            },
            600: {
                slidesPerView: 1.9
            }
        },
    });

    const ageSlider = new Swiper('.age-slider', {
        slidesPerView: 1,
        spaceBetween: 20,

        breakpoints: {
            768: {
                slidesPerView: 3
            },
            600: {
                slidesPerView: 1.9
            }
        },
    });

    // map
    function init() {
        let map = new ymaps.Map('contacts-map', {
            center: [59.9371262537648,30.33084804260225],
            zoom: 13
        });

        var elementsWithCoords = document.querySelectorAll('[data-coords]');

        // Перебираем каждый элемент и добавляем маркер на карту для его координат
        elementsWithCoords.forEach(function(element) {
            // Получаем координаты из атрибута data-coords
            var coords = element.getAttribute('data-coords').split(',').map(function(coord) {
                return parseFloat(coord);
            });
    
            // Добавляем маркер на карту
            var placemark = new ymaps.Placemark(coords, {
                balloonContent: `
                
                    <div class="balloon">
                        <div class="balloon__address">${element.textContent}</div>
                    </div>

                `
            }, {
                iconLayout: 'default#image',
                iconImageHref: '/img/map-mark.svg',
                iconImageSize: [15, 15],
                iconImageOffset: [0, 0]
            });
            map.geoObjects.add(placemark);

            // Обработка клика на элементе
            element.addEventListener('click', function() {
                // Центрируем карту на маркере
                map.setCenter(coords, 13);
    
                // Открываем балун
                placemark.balloon.open();
            });
        });

        map.controls.remove('geolocationControl'); // удаляем геолокацию
        map.controls.remove('searchControl'); // удаляем поиск
        map.controls.remove('trafficControl'); // удаляем контроль трафика
        map.controls.remove('typeSelector'); // удаляем тип
        map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        map.controls.remove('zoomControl'); // удаляем контрол зуммирования
        map.controls.remove('rulerControl'); // удаляем контрол правил
        map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    }
    ymaps.ready(init);
});