const swiperEl = document.querySelector('swiper-container')
Object.assign(swiperEl, {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    },
});
swiperEl.initialize();

var typed = new Typed('#element', {
    /**
        @property {array} strings strings to be typed
        @property {string} stringsElement 
        @property {number}ID of element containing string children
    */
    /**
     * @property {boolean} loop loop strings
     * @property {number} loopCount amount of loops
     */
    loop: true,
    strings: [
        'JOB?^1000',
        'TEMP?^1000',
        'STAFF?^1000'
    ]
});

$('.clientLogos').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
});

const swiperE2 = document.querySelector('swiper-container2')
Object.assign(swiperE2, {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 40,
        },
    },
});
swiperE2.initialize();

$(document).ready(function () {
    $(".counter").counterUp({
        delay: 20,
        time: 1300
    });
});