head.ready(function() {

    (function() {
        var leftElements = $('.figure__left').find('.figure__item').find('.btn');
            rightElements = $('.figure__right').find('.figure__item').find('.btn');
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

    function resizeFigure() {
        var figure      = $('.figure'),
            figureWidth = figure.width() + 60,
            windowWidth = $(window).width(),
            scale;
        if ( figureWidth > windowWidth ) {
            scale = windowWidth / figureWidth;
            figure.css({
                '-webkit-transform': 'scale(' + scale + ')',
                    '-ms-transform': 'scale(' + scale + ')',
                        'transform': 'scale(' + scale + ')',
            });
        } else {
            figure.css({
                '-webkit-transform': '',
                    '-ms-transform': '',
                        'transform': '',
            });
        }
    }

    $(window).on('resize', function() {
        resizeFigure();
    });
});