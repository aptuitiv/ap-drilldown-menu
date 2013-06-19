(function($){
    $(function(){
        placeWindowWidth('#width-tracker');

        $(window).on('resize', function(){
            updateWindowWidth('#width-tracker');
        });

        $('.navigation ul:first').apDrillDownMenu();

    });

    function placeWindowWidth(selector){
        if (typeof selector != 'string') return false;

        if (! $(selector).length) {
            var s = '<div id="' + selector.substr(1, selector.length - 1) + '"><div>Window width:</div><span></span></div>';
            $('body').append(s);
        }

        updateWindowWidth(selector);
    }

    function updateWindowWidth(selector){
        var s = $(selector);
        var w = $(window).width();
        if (!s.length) return false;

        if (s.children('span')) {
            s.children('span').text(w + 'px');
        } else {
            s.html(w + 'px');
        }
    }


})(jQuery);