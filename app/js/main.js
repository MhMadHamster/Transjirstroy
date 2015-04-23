$(document).ready(function() {

    var blockListHeaderHeight = $('.block-list__header').height;

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


    // Services
    $('.service__popup').click(function(e) {
        e.preventDefault();

        var serviceObject = $(this).attr('href');

        console.log(serviceObject);

        if ($('.service-object__block').is(':animated')) {
            clearInterval(wait);
        };

        if ($('.service-object__block.active').length) {
            $('.service-object__block.active').removeClass('active').fadeOut(300, function() {
                $(serviceObject).addClass('active').fadeIn(300);
            })
        } else {
            $(serviceObject).addClass('active').fadeIn(300);
        }
    })

    $('.js-popup').on('click', function(e) {
        e.preventDefault();
        $('.popup').bPopup();
    });

})