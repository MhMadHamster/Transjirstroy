$(document).ready(function() {

    var slider = $('.promo-slider').bxSlider({
                        pager: false,
                        mode: 'fade',
                        controls: false
                    });

    $('.js-slider-prev').on('click', function(e) {
        e.preventDefault();
        slider.goToPrevSlide();
    })

    $('.js-slider-next').on('click', function(e) {
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

    setTimeout(function() {
        $('input, select').styler();
    }, 100);


    // Search form
    $('.search-input').focus(function() {
        $(this).attr('placeholder', 'Введите слово').closest('.search').addClass('active');
    });

    $('.search-input').focusout(function() {
        $(this).attr('placeholder', 'поиск').closest('.search').removeClass('active');
        $(this).val('');
    });

})