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
                // phoneOffsetTop = phone.offset().top,
                phoneHeight    = phone.height() - 95, //because phone image has bottom shadow
                point,
                topPos;

            function calculateTopPos() {
                topPos = $(window).height() / 2 - phoneHeight / 2;
                point  = phone.offset().top + -topPos;
            }

            calculateTopPos();

            $(window).on('resize', function() {
                calculateTopPos();
            });

            $(document).on('scroll', function() {
                if ( $(window).width() >= 1000 ) {
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
        var flipText    = $(selector),
            str         = flipText.text(),
            flipAnimDur = parseInt(flipText.data('duration'));

        flipText.text('');

        for (var i = 0; i < str.length; i++) {
            flipText.append('<div class="char"><span></span>' +
                               '<div class="char__top"><span></span></div>' +
                               '<div class="char__bottom"><span></span></div>' +
                            '</div>');
        }

        if (flipAnimDur) {
            flipAnimDur = flipAnimDur;
        } else {
            flipAnimDur = 400;
        }

        flipText.find('.char').each(function(index) {
            var char        = $(this),
                charText    = char.find('span'),
                charTop     = char.find('.char__top span'),
                charBotom   = char.find('.char__bottom span'),
                animClass   = 'is-animate',
                targetValue = parseInt(str[index]),
                minValue    = 0;

            // setTimeout(function() {
            //     char.addClass(animClass);
            // }, flipAnimDur);

            function setCharValue() {
                setTimeout(function() {
                    if ( targetValue >= minValue ) {
                        charText.text(minValue);
                        charTop.text(minValue);
                        charBotom.text(minValue);
                        minValue++;
                        setCharValue();
                        if (!char.hasClass(animClass)) {
                            char.addClass(animClass);
                        }
                    } else {
                        char.removeClass(animClass);
                    }
                }, flipAnimDur);
            }

            setCharValue();

            setInterval(function(){
                minValue = 0;
                setCharValue();
            }, 15000);
        });
    }

    if ( $('.js-flip-text').length ) {
        createFlipText('.js-flip-text');
    }
});