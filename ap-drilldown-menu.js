(function($) {
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
				var container = menu.parent();
				
				// Checks the height of the element against the max height
				var checkHeight = function(el) {
	    			if (maxHeight > 0) {
		    			if (el.height() > maxHeight) {el.addClass(css.scroll);}
		    			el.height(maxHeight);
		    		} else {
		    			container.height(el.height());
		    		}
	    		};
	    		var setup = menu.data('apDrillDownMenuSetup');
				if (setup != 'yes') {
					menu.data('apDrillDownMenuSetup', 'yes');
					menu.addClass(css.menuTop).addClass(css.current);
					menu.wrap('<div class="' + css.menuWrapper + '"></div>');
					container = menu.parent();
					container.css({width: opts.width, height: opts.height});
					
					// Handle the back link if it's setup
					var backLink = false;
					if (opts.backLink == true && opts.backLinkSelector != undefined) {
						backLink = $(opts.backLinkSelector).hide();
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
					}
					
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
		    				if (!isTop) {
		    					backLink.show();
		    				} else {
		    					backLink.hide();
		    				}
		    			}
		    			if (currentTextHolder != false) {
		    				if (!isTop) {
		    					currentTextHolder.show();
		    				} else {
		    					currentTextHolder.hide();
		    				}
		    			}
		    		};
		    		// Fixes the widths and positions when the device is rotated or the window is resized
		    		var fixWidths = function() {
		    			var current = $('.' + css.current, menu);
		    			var numParents = current.parentsUntil('.' + css.menuWrapper, 'ul').length;
		    			var width = container.width();
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
								var li = $('<li></li>');
								li.append(clone);
								
								link.next().prepend(li);
								if (typeof opts.prependCurrentOnChildCallback == 'function') {
									opts.prependCurrentOnChildCallback.apply(clone);
								}
								
							}
							link.append('<span class="' + css.icon + '"></span>');
							link.click(function() {
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
							});
						} 
					});
		    	} else {
		    		// This element is being setup again. Make sure that the menu dimensions are correct
		    		checkHeight($('ul.' + css.current, container));
		    	}
			}
	    });
	};
	$.fn.apDrillDownMenu.defaults = {
		width: '100%',
		height: 'auto',
		showSpeed: 200,
		backLink: true,
		backLinkSelector: 'a.ap-ddmenu-back',
		currentText: true,
		currentTextSelector: '.ap-ddmenu-current-text',
		prependCurrentOnChild: true,
		prependCurrentOnChildCallback: function() {}
	};
})(jQuery);
