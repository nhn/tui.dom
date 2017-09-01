# TOAST UI Dom library

A module for manipulating the DOM or control the DOM events.

## Feature

* Module that can control the information of DOM
* Add, remove, find DOM class name
* DOM events module
* Add, remove, fire DOM events
* Control mouse events

## Documentation

* **API** : [https://nhnent.github.io/tui.dom/latest](https://nhnent.github.io/tui.dom/latest)
* **Tutorial** : [https://github.com/nhnent/tui.dom/wiki](https://github.com/nhnent/tui.dom/wiki)

## Dependency

* [tui-code-snippet](https://github.com/nhnent/tui.code-snippet): ^1.2.5

## Test environment
### PC
* IE8~11
* Edge
* Chrome
* Firefox
* Safari

## Usage
### Use `npm`

Install the latest version using `npm` command:

```
$ npm install tui-dom --save
```

or want to install the each version:

```
$ npm install tui-dom@<version> --save
```

To access as module format in your code:

```javascript
var domUtil = require('tui-dom');
domUtil.addClass(element, 'candies');
```

### Use `bower`
Install the latest version using `bower` command:

```
$ bower install tui-dom
```

or want to install the each version:

```
$ bower install tui-dom#<tag>
```

To access as namespace format in your code:

```javascript
var domUtil = tui.dom;
domUtil.addClass(element, 'candies');
```

### Download
* [Download bundle files from `dist` folder](https://github.com/nhnent/tui.dom/tree/production/dist)
* [Download all sources for each version](https://github.com/nhnent/tui.dom/releases)

## License
[MIT LICENSE](https://github.com/nhnent/tui.dom/blob/master/LICENSE)
