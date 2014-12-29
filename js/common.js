head.ready(function() {

    (function() {
        var leftElements = $('.figure__left').find('.figure__item').find('.el');
            rightElements = $('.figure__right').find('.figure__item').find('.el');
        function toggleActiveClass(elements) {
            elements.on('click', function() {
                elements.parents('.figure__item').removeClass('is-active');
                $(this).parents('.figure__item').addClass('is-active');
            });
        }
        toggleActiveClass(leftElements);
        toggleActiveClass(rightElements);
    })();

    if ( $('.js-phone').length ) {
        (function() {
            var phone          = $('.js-phone'),
                phoneOffsetTop = phone.offset().top,
                phoneHeight    = phone.height() - 95, //because phone image has bottom shadow
                point,
                topPos;

            function calculateTopPos() {
                topPos = $(window).height() / 2 - phoneHeight / 2;
                point  = phoneOffsetTop + -topPos;
            }

            calculateTopPos();

            $(window).on('resize', function() {
                calculateTopPos();
            });

            $(document).on('scroll', function() {
                if ( $(window).scrollTop() >= point ) {
                    phone.css({
                        position   : 'fixed',
                        top        : topPos
                    });
                } else {
                    phone.css({
                        position  : '',
                        top       : ''
                    });
                }
            });
        })();
    }

    function scaleFigure() {
        var figure      = $('.figure'),
            figureWidth = figure.outerWidth() + 150,
            windowWidth = $(window).width(),
            scale;

        if (windowWidth <= 1000 && !figure.hasClass('is-mobile')) {
            figure.addClass('is-mobile');
        }

        if (windowWidth > 1000 && figure.hasClass('is-mobile')) {
            figure.removeClass('is-mobile');
        }

        if ( figureWidth > windowWidth ) {
            scale  = windowWidth / figureWidth;
            figure.css({
                '-webkit-transform': 'scale(' + scale + ')',
                    '-ms-transform': 'scale(' + scale + ')',
                        'transform': 'scale(' + scale + ')'
            });
        } else {
            figure.css({
                '-webkit-transform': '',
                    '-ms-transform': '',
                        'transform': ''
            });
        }
    }

    scaleFigure();

    $(window).on('resize', function() {
        if ($(window).width() >= 640) {
            scaleFigure();
        }
    });


    function createFlipText(selector) {
        var flipText = $(selector),
            str      = flipText.text();

        flipText.text('');

        for (var i = 0; i < str.length; i++) {
            flipText.append('<div class="char">' + str[i] +
                               '<div class="char__top"><span>' + str[i] + '</span></div>' +
                               '<div class="char__bottom"><span>' + str[i] + '</span></div>' +
                            '</div>');
        }
    }

    if ( $('.js-flip-text').length ) {
        createFlipText('.js-flip-text');
    }
});