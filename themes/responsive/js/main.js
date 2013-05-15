(function($){
	$(function(){

		$(window).on('load resize', function(){
			placeWindowWidth('#width-tracker');
		});

		$('#nav-button').on('click', function(e){
			$('.navigation .menu').stop(1,1).slideToggle();
		});
	});

	function placeWindowWidth(selector){
		if (typeof selector != 'string') return false;

		var s = $(selector);
		var w = $(window).width();
		(s.children('span')) ? s.children('span').text(w + 'px') : s.html(w + 'px');
	}


})(jQuery);