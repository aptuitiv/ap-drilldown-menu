;(function($, window, undefined) {
	$.fn.apDrillDownMenu = function(options) {
		var opts = $.extend({}, $.fn.apDrillDownMenu.defaults, options);
		opts.showSpeed = parseInt(opts.showSpeed);
		var maxHeight = parseInt(opts.height);
		var css = {
			current: 'ap-ddmenu-current',
			icon: 'ap-ddmenu-link-icon',
			menuTop: 'ap-ddmenu-top',
			menuWrapper: 'ap-ddmenu',
			scroll: 'ap-ddmenu-scroll'
		};
		css.menuTopTest = '.' + css.menuTop;
	    return this.each(function() {

	    	if (this.tagName.toLowerCase() == 'ul') {

				var menu = $(this);
				var p = menu.parent(), container = menu.parent();
				var ancestor, container;

				// Handling the sliding/hiding of the navigation via the toggle.
				$(opts.toggleSwitch).on('click', function (e) {
					e.preventDefault();

					// Fixing the menu widths when the toggle is clicked.
					fixWidths();

					p.stop().slideToggle({'duration' : opts.toggleSpeed});
					checkHeight(menu);
				});

				var w = $(window).width();

				// Checks the height of the element against the max height
				var checkHeight = function(el) {
	    			if (maxHeight > 0) {
		    			if (parseInt(el.css('height')) > maxHeight) el.addClass(css.scroll);
		    			el.css('height', maxHeight);
		    		} else {
		    			console.log(container.attr('class'));
		    			container.css('height', el.height());
		    		}
	    		};

	    		var setup = menu.data('apDrillDownMenuSetup');

				if (setup != 'yes') {
					menu.data('apDrillDownMenuSetup', 'yes');
					menu.addClass(css.menuTop).addClass(css.current);
					menu.wrap('<div class="' + css.menuWrapper + '"></div>');

					container = menu.parent();
					container.css({width: opts.width, height: opts.height});

					// Getting the parent of the new container.
					ancestor = container.parent();

					// Create the back link if it doesn't already exist in the DOM.
					if ( !(opts.backLink == true && opts.backLinkSelector != undefined && $(opts.backLinkSelector).length > 0) )  {
						container.prepend('<a href="#" class="'+ opts.backLinkSelector.substr(1, opts.backLinkSelector.length - 1) + '">' + opts.backLinkText + '</a>');
					}

					var backLink = $(opts.backLinkSelector);
					backLink.hide();

					backLink.click(function() {
						var b = $(this);
			    		var prevLeftVal = parseFloat(menu.css('left')) + container.width();
			    		menu.animate({ left: prevLeftVal },  opts.showSpeed, function(){
			    			var current = $('ul.' + css.current, menu);
			    			current.hide();
			    			var currentParent = current.parents('ul:first');
			    			reset(current);
			    			setCurrent(currentParent);
			    			if (currentTextHolder != false && currentParent.is(css.menuTopTest) == false) {
			    				currentTextHolder.text(currentParent.prev().text());
			    			}
			    		});
			    		return false;
					});

					// Setup the current text placeholder if necessary
					var currentTextHolder = false;
					if (opts.currentText) {
						currentTextHolder = $(opts.currentTextSelector);
					}

					// Set internal functions. Set here so that local variables are available

		    		// Resets the old current ul
		    		var reset = function (el) {
		    			el.removeClass(css.scroll).removeClass(css.current);
		    		};

		    		// Handles setting up the current ul
					var setCurrent = function (el) {
						var isTop = el.is(css.menuTopTest);

						if (!isTop) {
							el.css('left', container.width());
						}

		    			el.show().addClass(css.current);
		    			checkHeight(el);

		    			if (backLink != false) {
		    				(!isTop) ? backLink.show() : backLink.hide();
		    			}

		    			if (currentTextHolder != false) {
		    				(!isTop) ? currentTextHolder.show() : currentTextHolder.hide();
		    			}
		    		};
		    		// Fixes the widths and positions when the device is rotated or the window is resized
		    		var fixWidths = function() {
		    			var current = $('.' + css.current, menu);
		    			var numParents = current.parentsUntil('.' + css.menuWrapper, 'ul').length;
		    			// var width = parseInt(container.css('width'));

		    			// Getting the window width to set the widths.
		    			// .css() can't be called on a hidden element.
		    			var width = $(window).width();
		    			if (numParents > 0) {
		    				menu.css('left', (numParents * width * -1));
		    				current.parentsUntil('.' + css.menuTop, 'ul').css('left', width);
		    				current.css('left', width);
		    			}
		    		}
		    		// Add listeners to fix the widths when the device is rotated or the window is resized
		    		window.addEventListener("resize", fixWidths, false);
		    		window.addEventListener("orientationchange", fixWidths, false);

		    		// Set the initial height of the first level menu
		    		checkHeight(menu);

		    		// Handle the clicks for each menu item
					menu.find('a').each(function() {
						var link = $(this);
						// If the link has a child menu
						if (link.next().is('ul')) {
							if (opts.prependCurrentOnChild) {
								var clone = link.clone(true);
								var li = $('<li class="' + opts.cloneClass + '"></li>');

								li.append(clone);

								link.next().prepend(li);
								if (typeof opts.prependCurrentOnChildCallback == 'function') {
									opts.prependCurrentOnChildCallback.apply(clone);
								}

							}
							link.append('<span class="' + css.icon + '"></span>');

							link.click(function() {
								// Checking window width - need to know whether to make the click event scroll down the menus or not.
								if ( $(window).width() <= opts.maxWindowWidth) {
									var nextList = $(this).next();
									var parentList = link.parents('ul:first');
									var isFirstLevel = parentList.is(css.menuTopTest);
									var parentLeft = (isFirstLevel) ? 0 : parseFloat(menu.css('left'));
									var containerWidth = parseFloat(container.width());
									var nextLeft = Math.round(parentLeft - containerWidth);
									reset(parentList);
									setCurrent(nextList);
									menu.animate({left: nextLeft}, opts.showSpeed);

									if (currentTextHolder != false) {
										currentTextHolder.text(link.text());
									}
									return false;
								}
							});

						}
					});

					$(window).on('resize', function(){
						delay(function(){
							showOrHide();
						}, 100);

						fixWidths();
					});

		    	} else {
		    		// This element is being set up again. Make sure that the menu dimensions are correct
		    		checkHeight($('ul.' + css.current, container));
		    	}

		    	var showOrHide = function() {
		    		if ( $(window).width() > opts.maxWindowWidth ){
		    			container.css('height', 0);

		    			$(css.menuTopTest).find('ul').attr('style', '');

		    			if (! $('.' + css.current).hasClass(css.menuTop) && $('.' + css.current).parent().hasClass(css.menuWrapper) ) {
		    				$('.' + css.current).hide().parent().closest('.sub-menu').hide();
		    			}

		    			ancestor.attr('style', '');
		    		} else {
		    			container.css('height', $('.' + css.current).css('height'));
		    			if ( ancestor.hasClass('expanded')) ancestor.show();

		    			if ( !$('.' + css.current).hasClass(css.menuTop) ) {
		    				$('.' + css.current).show().parent().closest('.sub-menu').show();
		    			}

		    			$('.' + css.current).show().parent().closest('.sub-menu').show();
		    		}
		    	};
			}
	    });
	};

	$.fn.apDrillDownMenu.defaults = {
		maxWindowWidth: 875, // Width that the navigation becomes "active"
		width: '100%',
		height: 'auto',
		showSpeed: 200,
		backLink: true,
		backLinkText: 'Back',
		backLinkSelector: '.ap-ddmenu-back',
		currentText: true,
		currentTextSelector: '.ap-ddmenu-current-text',
		cloneClass: 'clone',
		prependCurrentOnChild: true,
		prependCurrentOnChildCallback: function() {},
		toggleSwitch: '.ap-ddmenu-toggle',
		toggleSpeed: 200
	};

	// Setting up a timeout function for the resize event.
	var delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
	    clearTimeout(timer);
	    timer = setTimeout(callback, ms);
	  };

	})();

})(jQuery, window);