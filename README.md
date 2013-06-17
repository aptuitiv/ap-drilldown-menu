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
A zoom issue is probably due to an improper/missing attribute on a meta tag. Be sure that "initial-scale=1;" is inside the content attribute of your <meta name="viewport"> tag.

```html
<meta name="viewport" content="initial-scale=1.0">
```
