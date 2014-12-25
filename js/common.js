head.ready(function() {

    (function() {
        var leftElements = $('.figure__left').find('.figure__item');
            rightElements = $('.figure__right').find('.figure__item');
        function toggleActiveClass(elements) {
            elements.on('click', function() {
                elements.removeClass('is-active');
                $(this).addClass('is-active');
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
        var figure = $('.figure'),
            scale;

        figure.css({
            '-webkit-transform': 'scale(' + scale + ')',
                '-ms-transform': 'scale(' + scale + ')',
                    'transform': 'scale(' + scale + ')',
        });
    }
});