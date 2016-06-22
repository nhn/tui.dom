/**
 * @fileoverview DOM manipulation utility module
 * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
 */
const util = tui.util;
const domevent = require('./domevent');

/**
 * Setting element style
 * @param {(HTMLElement|SVGElement)} element - element to setting style
 * @param {(string|object)} key - style prop name or {prop: value} pair object
 * @param {string} [value] - style value
 * @name css
 * @memberof tui.domutil
 * @function
 * @api
 */
export function css(element, key, value) {
    const style = element.style;

    if (util.isString(key)) {
        style[key] = value;

        return;
    }

    util.forEach(key, function(v, k) {
        style[k] = v;
    });
}

/**
 * Get HTML element's design classes.
 * @param {(HTMLElement|SVGElement)} element target element
 * @returns {string} element css class name
 * @name getClass
 * @memberof tui.domutil
 * @function
 * @api
 */
export function getClass(element) {
    if (!element || !element.className) {
        return '';
    }

    if (util.isUndefined(element.className.baseVal)) {
        return element.className;
    }

    return element.className.baseVal;
}

/**
 * Check element has specific css class
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {string} cssClass - css class
 * @returns {boolean}
 * @name hasClass
 * @memberof tui.domutil
 * @function
 * @api
 */
export function hasClass(element, cssClass) {
    if (element.classList) {
        return element.classList.contains(cssClass);
    }

    let origin = getClass(element).split(/\s+/);

    return origin.indexOf(cssClass) > -1;
}

/**
 * Add css class to element
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {...string} cssClass - css classes to add
 * @name addClass
 * @memberof tui.domutil
 * @function
 * @api
 */
export function addClass(element, ...cssClass) {    // eslint-disable-line
    if (element.classList) {
        const classList = element.classList;
        cssClass.forEach(name => {
            classList.add(name);
        });

        return;
    }

    const origin = getClass(element);

    if (origin) {
        cssClass = [...origin.split(/\s+/), ...cssClass];
    }

    const newClass = [...new Set(cssClass)].join(' ');

    if (util.isUndefined(element.className.baseVal)) {
        element.className = newClass;

        return;
    }

    element.className.baseVal = newClass;
}

/**
 * Remove css class from element
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {...string} cssClass - css classes to remove
 * @name removeClass
 * @memberof tui.domutil
 * @function
 * @api
 */
export function removeClass(element, ...cssClass) {    // eslint-disable-line
    if (element.classList) {
        const classList = element.classList;
        cssClass.forEach(name => {
            classList.remove(name);
        });

        return;
    }

    const origin = getClass(element).split(/\s+/);
    const classes = origin.filter(name => {
        return cssClass.indexOf(name) < 0;
    });
    const newClass = classes.join(' ');

    if (util.isUndefined(element.className.baseVal)) {
        element.className = newClass;

        return;
    }

    element.className.baseVal = newClass;
}

/**
 * getBoundingClientRect polyfill
 * @param {HTMLElement} element - target element
 * @returns {object} rect object
 * @name getRect
 * @memberof tui.domutil
 * @function
 * @api
 */
export function getRect(element) {
    let {top, right, bottom, left, width, height} =
        element.getBoundingClientRect();

    if (util.isUndefined(width) || util.isUndefined(height)) {
        width = element.offsetWidth;
        height = element.offsetHeight;
    }

    return {top, right, bottom, left, width, height};
}

/**
 * Convert uppercase letter to hyphen lowercase character
 * @param {string} match - match from String.prototype.replace method
 * @returns {string}
 * @name upperToHyphenLower
 * @memberof tui.domutil
 * @function
 * @api
 */
function upperToHyphenLower(match) {
    return '-' + match.toLowerCase();
}

/**
 * Set data attribute to target element
 * @param {HTMLElement} element - element to set data attribute
 * @param {string} key - key
 * @param {string} value - value
 * @name setData
 * @memberof tui.domutil
 * @function
 * @api
 */
export function setData(element, key, value) {
    if (element.dataset) {
        element.dataset[key] = value;

        return;
    }

    key = key.replace(/([A-Z])/g, upperToHyphenLower);

    element.setAttribute('data-' + key, value);
}

/**
 * Get data value from data-attribute
 * @param {HTMLElement} element - target element
 * @param {string} key - key
 * @returns {string} value
 * @name getData
 * @memberof tui.domutil
 * @function
 * @api
 */
export function getData(element, key) {
    if (element.dataset) {
        return element.dataset[key];
    }

    key = key.replace(/([A-Z])/g, upperToHyphenLower);

    return element.getAttribute('data-' + key);
}

/**
 * Remove data property
 * @param {HTMLElement} element - target element
 * @param {string} key - key
 * @name removeData
 * @memberof tui.domutil
 * @function
 * @api
 */
export function removeData(element, key) {
    if (element.dataset) {
        delete element.dataset[key];

        return;
    }

    key = key.replace(/([A-Z])/g, upperToHyphenLower);

    element.removeAttribute('data-' + key);
}

/**
 * Remove element from parent node.
 * @param {HTMLElement} element - element to remove.
 * @name removeElement
 * @memberof tui.domutil
 * @function
 * @api
 */
export function removeElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * Set element bound
 * @param {HTMLElement} element - element to change bound
 * @param {object} bound - bound object
 * @param {number} [bound.top] - top pixel
 * @param {number} [bound.right] - right pixel
 * @param {number} [bound.bottom] - bottom pixel
 * @param {number} [bound.left] - left pixel
 * @param {number} [bound.width] - width pixel
 * @param {number} [bound.height] - height pixel
 * @name setBound
 * @memberof tui.domutil
 * @function
 * @api
 */
export function setBound(element, {top, right, bottom, left, width, height} = {}) {
    const args = {top, right, bottom, left, width, height};
    const newBound = {};

    util.forEach(args, (value, prop) => {
        if (util.isExisty(value)) {
            newBound[prop] = util.isNumber(value) ? (value + 'px') : value;
        }
    });

    Object.assign(element.style, newBound);
}

const elProto = Element.prototype;
const matchSelector = elProto.matches ||
    elProto.webkitMatchesSelector ||
    elProto.mozMatchesSelector ||
    elProto.msMatchesSelector ||
    function(selector) {
        const doc = this.document || this.ownerDocument;
        const match = findAll(doc, selector).find(el => this === el);

        return !!match;
    };

/**
 * Check element match selector
 * @param {HTMLElement} element - element to check
 * @param {string} selector - selector to check
 * @returns {boolean} is selector matched to element?
 * @name matches
 * @memberof tui.domutil
 * @function
 * @api
 */
export function matches(element, selector) {
    return matchSelector.call(element, selector);
}

/**
 * Find parent element recursively
 * @param {HTMLElement} element - base element to start find
 * @param {string} selector - selector string for find
 * @returns {HTMLElement} - element finded or null
 * @name closest
 * @memberof tui.domutil
 * @function
 * @api
 */
export function closest(element, selector) {
    var parent = element.parentNode;

    if (matches(element, selector)) {
        return element;
    }

    while (parent && parent !== document) {
        if (matches(parent, selector)) {
            return parent;
        }

        parent = parent.parentNode;
    }


    return null;
}

/**
 * Find single element
 * @param {(HTMLElement|string)} [element=document] - base element to find
 * @param {string} [selector] - css selector
 * @returns {HTMLElement}
 * @name find
 * @memberof tui.domutil
 * @function
 * @api
 */
export function find(element, selector) {
    if (util.isString(element)) {
        return document.querySelector(element);
    }

    return element.querySelector(selector);
}

/**
 * Find multiple element
 * @param {(HTMLElement|string)} [element=document] - base element to
 *  find
 * @param {string} [selector] - css selector
 * @returns {HTMLElement[]}
 * @name findAll
 * @memberof tui.domutil
 * @function
 * @api
 */
export function findAll(element, selector) {
    if (util.isString(element)) {
        return [...document.querySelectorAll(element)];
    }

    return [...element.querySelectorAll(selector)];
}

/**
 * Stop event propagation.
 * @param {Event} e - event object
 * @name stopPropagation
 * @memberof tui.domutil
 * @function
 * @api
 */
export function stopPropagation(e) {
    if (e.stopPropagation) {
        e.stopPropagation();

        return;
    }

    e.cancelBubble = true;
}

/**
 * Prevent default action
 * @param {Event} e - event object
 * @name preventDefault
 * @memberof tui.domutil
 * @function
 * @api
 */
export function preventDefault(e) {
    if (e.preventDefault) {
        e.preventDefault();

        return;
    }

    e.returnValue = false;
}

/**
 * Check specific CSS style is available.
 * @param {array} props property name to testing
 * @returns {(string|boolean)} return true when property is available
 * @name testCSSProp
 * @memberof tui.domutil
 * @function
 * @api
 * @example
 * var props = ['transform', '-webkit-transform'];
 * domutil.testCSSProp(props);    // 'transform'
 */
function testCSSProp(props) {
    var style = document.documentElement.style,
        i = 0,
        len = props.length;

    for (; i < len; i += 1) {
        if (props[i] in style) {
            return props[i];
        }
    }

    return false;
}

let prevSelectStyle = '';
const SUPPORT_SELECTSTART = 'onselectstart' in document;
const userSelectProperty = testCSSProp([
    'userSelect',
    'WebkitUserSelect',
    'OUserSelect',
    'MozUserSelect',
    'msUserSelect'
]);

/**
 * Disable browser's text selection behaviors.
 * @param {HTMLElement} [el] - target element. if not supplied, use `document`
 * @name disableTextSelection
 * @memberof tui.domutil
 * @function
 * @api
 */
export function disableTextSelection(el = document) {
    var style;

    if (SUPPORT_SELECTSTART) {
        domevent.on(el, 'selectstart', preventDefault);
    } else {
        el = (el === document) ? document.documentElement : el;
        style = el.style;
        prevSelectStyle = style[userSelectProperty];
        style[userSelectProperty] = 'none';
    }
}

/**
 * Enable browser's text selection behaviors.
 * @param {HTMLElement} [el] - target element. if not supplied, use `document`
 * @name enableTextSelection
 * @memberof tui.domutil
 * @function
 * @api
 */
export function enableTextSelection(el = document) {
    if (SUPPORT_SELECTSTART) {
        domevent.off(el, 'selectstart', preventDefault);
    } else {
        el = (el === document) ? document.documentElement : el;
        el.style[userSelectProperty] = prevSelectStyle;
    }
}

/**
 * Represents the text content of a node and its descendants
 * @param {HTMLElement} element - html element
 * @returns {string} text content
 * @name textContent
 * @memberof tui.domutil
 * @function
 * @api
 */
export function textContent(element) {
    if (util.isExisty(element.textContent)) {
        return element.textContent;
    }

    return element.innerText;
}

/**
 * Insert element to next of target element
 * @param {HTMLElement} element - html element to insert
 * @param {HTMLElement} target - target element
 * @name insertAfter
 * @memberof tui.domutil
 * @function
 * @api
 */
export function insertAfter(element, target) {
    const parent = target.parentNode;

    if (target === parent.lastChild) {
        parent.appendChild(element);
    } else {
        parent.insertBefore(element, target.nextSibling);
    }
}
