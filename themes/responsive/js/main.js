(function($){
	$(function(){

		$(window).on('load resize', function(){
			placeWindowWidth('#width-tracker');
		});

		// $('#nav-button').on('click', function(e){

		// 	e.preventDefault();

		// 	if ( !$('.navigation').is(':animated') ) {
		// 		$('.navigation').slideToggle('fast', function(){
		// 			var el = $(this);
		// 			el.toggleClass('expanded');
		// 			if (el.hasClass('expanded')) $('.navigation ul:first').apDrillDownMenu();
		// 		});
		// 	}
		// });

		$('.navigation ul:first').apDrillDownMenu();

	});

	function placeWindowWidth(selector){
		if (typeof selector != 'string') return false;

		var s = $(selector);
		var w = $(window).width();
		(s.children('span')) ? s.children('span').text(w + 'px') : s.html(w + 'px');
	}


})(jQuery);