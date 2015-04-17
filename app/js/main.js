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

    $('.thumb-list__item').on('click', function(e) {

        e.preventDefault();

        if(!$(this).hasClass('active')) {

            var currentThumb = $(this);
            var currentPersona = $(this).attr('href');

            $(this).closest('.thumb-list')
                   .find('.thumb-list__item.active')
                   .removeClass('active')
                   .closest('.personal-list')
                   .find('.personal-list__item.active')
                   .removeClass('active')
                   .fadeOut(300, function() {
                        currentThumb.addClass('active')
                                    .closest('.personal-list')
                                    .find('.personal-list__item' + currentPersona)
                                    .fadeIn(300)
                                    .addClass('active');
                   });
        }

    });

})