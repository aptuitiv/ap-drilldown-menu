# AP Drilldown Menu

Javascript based navigation menu for mobile and responsive layouts

## Calling the Plugin

Using the plugin is simple. Call it on the top level of your navigation, like so.

    $('ul.navigation').apDrillDownMenu();

That's it! There is a set of options that can be passed to this method.

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
    parentIconText: '',
    toggleSwitch: '.ap-ddmenu-toggle',
    toggleSpeed: 200

Adjust these to suit your navigation's structure and naming conventions.

## FAQ

#### Why does the window zoom when a link is clicked?
A zoom issue is probably due to an improper/missing attribute on a meta tag. Be sure that you've got a `<meta name="viewport">` tag and the content attribute is set accordingly. For example:

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0">
```
#### My CSS isn't working correctly!
The CSS is somewhat tricky, depending on how your navigation is set up and styled. If you use a CSS dropdown menu, the styles for the sub-navigation and its items will need to be overridden by the CSS in your media query, so the hover state on an &lt;li&gt; doesn't show its child &lt;ul&gt;. Here's a good boilerplate to get you started.

```css
.menu li {
    list-style: none;
    float: left;
    position: relative;
}

.menu li a {
    display: block;
}

.menu li ul {
    display: none;
    position: absolute;
    top: 100%; left: 0;
}

.menu li:hover ul {
    display: block;
}

.ap-ddmenu-toggle {
    display: none;
    height: 20px;
    width: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 100;
    background: #333;
}

@media (max-device-width: 768px) {
    .nav-wrap {
        display: none;
    }

    .ap-ddmenu-toggle {
        display: block;
    }

    .menu {
        position: relative;
    }

    .menu li:hover ul {
        display: none;
    }

    .menu li ul {
        position: absolute;
        top: 0;
        left: 100%;
    }

    .menu li {
        float: none;
        width: 100%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        /* We set the position to static so the child <ul> elements are positioned based on the top level <ul> */
        position: static;
    }
}
```