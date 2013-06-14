;(function($, window, undefined) {

    // Modernizr 2.6.2 (Custom Build) | MIT & BSD - Code to test support for media queries here only.
    window.Modernizr=function(a,b,c){function v(a){i.cssText=a}function w(a,b){return v(prefixes.join(a+";")+(b||""))}function x(a,b){return typeof a===b}function y(a,b){return!!~(""+a).indexOf(b)}function z(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:x(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l={},m={},n={},o=[],p=o.slice,q,r=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},s=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return r("@media "+b+" { #"+g+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},t={}.hasOwnProperty,u;!x(t,"undefined")&&!x(t.call,"undefined")?u=function(a,b){return t.call(a,b)}:u=function(a,b){return b in a&&x(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=p.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(p.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(p.call(arguments)))};return e});for(var A in l)u(l,A)&&(q=A.toLowerCase(),e[q]=l[A](),o.push((e[q]?"":"no-")+q));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)u(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},v(""),h=j=null,e._version=d,e.mq=s,e.testStyles=r,e}(this,this.document);

    var mq = Modernizr.mq('only all');

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

        // Showing and hiding the toggle switch via JS for IE8.
        if (!mq) {
            var p = $(this).parents().eq(0);

            $(window).on('load resize', function(){
                if ($(window).width() > opts.maxWindowWidth){
                    $('html').removeClass(opts.ieMobileClass);
                    $(opts.toggleSwitch).hide();
                } else {
                    $('html').addClass(opts.ieMobileClass);
                    $(opts.toggleSwitch).show();
                }
            });
        }

        css.menuTopTest = '.' + css.menuTop;
        return this.each(function() {

            if (this.tagName.toLowerCase() == 'ul') {

                var menu = $(this);
                var p = menu.parent(), container = menu.parent();
                var ancestor;

                // Handling the sliding/hiding of the navigation via the toggle.
                $(opts.toggleSwitch).on('click touchstart', function (e) {
                    e.preventDefault();

                    // Fixing the menu widths when the toggle is clicked.
                    fixWidths();

                    if (!mq) {
                        p.toggle();
                    } else {
                        p.stop().slideToggle({'duration' : opts.toggleSpeed});
                    }
                    checkHeight($('.' + css.current));
                });

                // Checks the height of the element against the max height
                var checkHeight = function(el) {
                    if (maxHeight > 0) {
                        if (parseInt(el.css('height')) > maxHeight) el.addClass(css.scroll).css('height', maxHeight);
                    } else {
                        container.css('height', el.outerHeight() + $(opts.headerSelector).outerHeight());
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

                    // Creating the header if it doesn't exist.
                    if ( !$(opts.headerSelector).length ) {
                        container.prepend('<div class="' + opts.headerSelector.split('.')[1] + '"></div>' );
                    }

                    var ddmenuHeader = $(opts.headerSelector);

                    // Setup the current text placeholder if necessary
                    var currentTextHolder = false;

                    if (opts.currentText) {
                        // If the current text holder is needed but doesn't exist, create it now.
                        if ( !$(opts.currentTextSelector).length ) {
                            ddmenuHeader.prepend('<div class="' + opts.currentTextSelector.split('.')[1] + '"></div>');
                        }

                        currentTextHolder = $(opts.currentTextSelector);
                    }

                    // Create the back link if it doesn't exist.
                    if ( !(opts.backLink === true && opts.backLinkSelector !== undefined && $(opts.backLinkSelector).length > 0) )  {
                        ddmenuHeader.prepend('<a href="#" class="' + opts.backLinkSelector.split('.')[1] + '">' + opts.backLinkText + '</a>');
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
                            if (currentTextHolder !== false && currentParent.is(css.menuTopTest) === false) {
                                currentTextHolder.text(currentParent.prev().text());
                            }
                        });
                        return false;
                    });

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

                        if (backLink !== false) {
                            (!isTop) ? backLink.show() : backLink.hide();
                        }

                        if (currentTextHolder !== false) {
                            (!isTop) ? currentTextHolder.show() : currentTextHolder.hide();
                        }
                    };

                    // Setting up a timeout function for the resize event.
                    var delay = (function(){
                        var timer = 0;
                        return function(callback, ms){
                            clearTimeout(timer);
                            timer = setTimeout(callback, ms);
                        };
                    })();

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
                    };

                    /**
                     * Add listeners to fix the widths when the device is rotated or the window is resized
                     */

                    // IE8- doesn't support addEventListener - use attachEvent instead.
                    if (!window.addEventListener) {
                        window.attachEvent('resize', fixWidths);
                    } else {
                        window.addEventListener("resize", fixWidths, false);
                        window.addEventListener("orientationchange", fixWidths, false);
                    }

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
                            link.append('<span class="' + css.icon + '">' + opts.parentIconText + '</span>');

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

                                    if (currentTextHolder !== false) {
                                        // Set the current text without getting the text within the icon span tag.
                                        currentTextHolder.text(link.clone().children().remove().end().text());
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
        ieMobileClass: 'mobile',
        width: '100%',
        height: 'auto',
        showSpeed: 200,
        backLink: true,
        backLinkText: 'Back',
        backLinkSelector: '.ap-ddmenu-back',
        headerSelector: '.ap-ddmenu-header',
        currentText: true,
        currentTextSelector: '.ap-ddmenu-current-text',
        cloneClass: 'clone',
        prependCurrentOnChild: true,
        prependCurrentOnChildCallback: function() {},
        parentIconText: '',
        toggleSwitch: '.ap-ddmenu-toggle',
        toggleSpeed: 200
    };

})(jQuery, window);