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
            var phone       = $('.js-phone'),
                phoneHeight = phone.height() - 75, //because phone image has bottom shadow
                maxBottomPos = $('.js-bottom-point'),
                startPoint,
                endPoint,
                topPos;

            function calculateTopPos() {
                topPos    = $(window).height() / 2 - phoneHeight / 2;
                startPoint  = phone.offset().top + -topPos;
                if (maxBottomPos.length) {
                    endPoint = maxBottomPos.offset().top - parseInt(maxBottomPos.css('margin-top'));
                }
            }

            calculateTopPos();


            $(window).on('resize', function() {
                calculateTopPos();
            });

            $(document).on('scroll', function() {
                if ( $(window).width() >= 1000 ) {
                    if ( $(window).scrollTop() >= startPoint ) {
                        var scrollPos = $(window).scrollTop() + topPos + phoneHeight;
                        if ( scrollPos >= endPoint ) {
                            var delta = scrollPos - endPoint;
                            phone.css({
                                position   : 'fixed',
                                top        : topPos - delta.toFixed(0)
                            });
                        } else {
                            phone.css({
                                position   : 'fixed',
                                top        : topPos
                            });
                        }
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
            scale = (windowWidth / figureWidth).toFixed(3);
            // scale = scale.toFixed(3);
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
            flipAnimDur = parseInt(flipText.data('duration')),
            animClass   = 'is-animate',
            input,
            characters;

        flipText.text('');
        flipAnimDur = flipAnimDur ? flipAnimDur : 400;
        flipText.parent().append('<input class="js-input-flip-text" type="number" value="' + str + '"/>');

        function buildCharacters (string) {
            for (var i = 0; i < string.length; i++) {
                flipText.append('<div class="char"><span>0</span>' +
                                   '<div class="char__top"><span>0</span></div>' +
                                   '<div class="char__bottom"><span>0</span></div>' +
                                '</div>');
            }
        }

        function findCharacters() {
            return flipText.find('.char');
        }

        function rebuildCharacters (string) {
            flipText.html('');
            buildCharacters(string);
            characters = findCharacters();
            characters.each(function(index) {
                charValue(this, index);
            });
        }

        // main function
        function charValue(selector, index) {
            var char        = $(selector),
                charText    = char.find('> span'),
                charTop     = char.find('.char__top span'),
                charBotom   = char.find('.char__bottom span'),
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
                        if (!char.hasClass(animClass)) {
                            char.addClass(animClass);
                        }
                        setCharValue();
                    } else {
                        char.removeClass(animClass);
                    }
                }, flipAnimDur);
            }

            setCharValue();

            // setInterval(function(){
            //     minValue = 0;
            //     setCharValue();
            // }, 15000);

            function changeCharValue() {
                var currentValue = parseInt(charText.text());
                var newValue = parseInt(str[index]);

                setTimeout(function() {
                    if ( newValue !== currentValue ) {
                        targetValue = currentValue === 9 ? 0 : ++currentValue;
                        charText.text(targetValue);
                        charTop.text(targetValue);
                        charBotom.text(targetValue);
                        if (!char.hasClass(animClass)) {
                            char.addClass(animClass);
                        }
                        changeCharValue();

                    } else {
                        char.removeClass(animClass);
                    }

                }, flipAnimDur);
            }

            input.on('change', function() {
                str = $(this).val();
                if ( str.length !== characters.length ) {
                    rebuildCharacters(str);
                }
                changeCharValue();
            });

            // setTimeout(function() {
                // setInterval(function() {
                //     var inputValue = parseInt(input.val());
                //     console.log(inputValue);
                //     inputValue++;
                //     input.attr('value', inputValue);
                //     input.trigger('change');
                // }, 2000);
            // }, flipAnimDur * 10);
        }

        buildCharacters(str);

        characters = findCharacters();
        input = $('.js-input-flip-text');
        str = input.val();


        characters.each(function(index) {
            charValue(this, index);
        });
    }

    if ( $('.js-flip-text').length ) {
        createFlipText('.js-flip-text');
    }
});