$(document).ready(function() {

    var slider = $('.promo-slider').bxSlider({
                        pager: false,
                        mode: 'fade',
                        controls: false
                    });

    $('.slider-prev').on('click', function(e) {
        e.preventDefault();
        slider.goToPrevSlide();
    })

    $('.slider-next').on('click', function(e) {
        e.preventDefault();
        slider.goToNextSlide();
    })


})