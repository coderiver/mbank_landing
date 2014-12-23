head.ready(function() {

    (function(){
        var radioBtns = $('.figure').find('input[type="radio"]');
        radioBtns.each(function() {
            $(this).on('change', function() {
                console.log($(this));
                var radio = $(this),
                    el = $(this).parents('.figure__item');
                if (radio.is(':checked')) {
                    el.addClass('is-active');
                } else {
                    el.removeClass('is-active');
                }
            });
        });
    })();

});