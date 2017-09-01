/**
 * @fileoverview DOM manipulation utility module
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */
import * as domevent from './domevent';
import snippet from 'tui-code-snippet';

const aps = Array.prototype.slice;
const trim = str => str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Setting element style
 * @param {(HTMLElement|SVGElement)} element - element to setting style
 * @param {(string|object)} key - style prop name or {prop: value} pair object
 * @param {string} [value] - style value
 * @name css
 * @memberof tui.dom
 * @function
 * @api
 */
export function css(element, key, value) {
    const {style} = element;

    if (snippet.isString(key)) {
        style[key] = value;

        return;
    }

    snippet.forEach(key, (v, k) => {
        style[k] = v;
    });
}

/**
 * Get HTML element's design classes.
 * @param {(HTMLElement|SVGElement)} element target element
 * @returns {string} element css class name
 * @name getClass
 * @memberof tui.dom
 * @function
 * @api
 */
export function getClass(element) {
    if (!element || !element.className) {
        return '';
    }

    if (snippet.isUndefined(element.className.baseVal)) {
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
 * @memberof tui.dom
 * @function
 * @api
 */
export function hasClass(element, cssClass) {
    if (element.classList) {
        return element.classList.contains(cssClass);
    }

    const origin = getClass(element).split(/\s+/);

    return snippet.inArray(cssClass, origin) > -1;
}

/**
 * Set className value
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {(string|string[])} cssClass - class names
 * @ignore
 */
function setClassName(element, cssClass) {
    cssClass = snippet.isArray(cssClass) ? cssClass.join(' ') : cssClass;

    cssClass = trim(cssClass);

    if (snippet.isUndefined(element.className.baseVal)) {
        element.className = cssClass;
        return;
    }

    element.className.baseVal = cssClass;
}

/**
 * Add css class to element
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {...string} cssClass - css classes to add
 * @name addClass
 * @memberof tui.dom
 * @function
 */
export function addClass(element) {
    let cssClass = aps.call(arguments, 1); // eslint-disable-line prefer-rest-params

    if (element.classList) {
        const {classList} = element;
        snippet.forEach(cssClass, name => {
            classList.add(name);
        });
        return;
    }

    const origin = getClass(element);

    if (origin) {
        cssClass = [].concat(origin.split(/\s+/), cssClass);
    }

    const newClass = [];

    snippet.forEach(cssClass, cls => {
        if (snippet.inArray(cls, newClass) < 0) {
            newClass.push(cls);
        }
    });

    setClassName(element, newClass);
}

/**
 * Toggle css class
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {...string} cssClass - css classes to toggle
 * @name toggleClass
 * @memberof tui.dom
 * @function
 */
export function toggleClass(element) {
    const cssClass = aps.call(arguments, 1); // eslint-disable-line prefer-rest-params

    if (element.classList) {
        snippet.forEach(cssClass, name => {
            element.classList.toggle(name);
        });
        return;
    }

    const newClass = getClass(element).split(/\s+/);

    snippet.forEach(cssClass, name => {
        const idx = snippet.inArray(name, newClass);

        if (idx > -1) {
            newClass.splice(idx, 1);
        } else {
            newClass.push(name);
        }
    });

    setClassName(element, newClass);
}

/**
 * Remove css class from element
 * @param {(HTMLElement|SVGElement)} element - target element
 * @param {...string} cssClass - css classes to remove
 * @name removeClass
 * @memberof tui.dom
 * @function
 */
export function removeClass(element) {    // eslint-disable-line
    const cssClass = aps.call(arguments, 1); // eslint-disable-line prefer-rest-params

    if (element.classList) {
        const {classList} = element;
        snippet.forEach(cssClass, name => {
            classList.remove(name);
        });

        return;
    }

    const origin = getClass(element).split(/\s+/);

    const newClass = snippet.filter(
        origin, name => snippet.inArray(name, cssClass) < 0
    );

    setClassName(element, newClass);
}

/**
 * getBoundingClientRect polyfill
 * @param {HTMLElement} element - target element
 * @returns {object} rect object
 * @name getRect
 * @memberof tui.dom
 * @function
 */
export function getRect(element) {
    const rect = element.getBoundingClientRect();
    const {top, right, bottom, left} = rect;
    let {width, height} = rect;

    if (snippet.isUndefined(width) || snippet.isUndefined(height)) {
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
 * @memberof tui.dom
 * @function
 */
function upperToHyphenLower(match) {
    return `-${match.toLowerCase()}`;
}

/**
 * Set data attribute to target element
 * @param {HTMLElement} element - element to set data attribute
 * @param {string} key - key
 * @param {string} value - value
 * @name setData
 * @memberof tui.dom
 * @function
 */
export function setData(element, key, value) {
    if (element.dataset) {
        element.dataset[key] = value;

        return;
    }

    key = key.replace(/([A-Z])/g, upperToHyphenLower);

    element.setAttribute(`data-${key}`, value);
}

/**
 * Get data value from data-attribute
 * @param {HTMLElement} element - target element
 * @param {string} key - key
 * @returns {string} value
 * @name getData
 * @memberof tui.dom
 * @function
 */
export function getData(element, key) {
    if (element.dataset) {
        return element.dataset[key];
    }

    key = key.replace(/([A-Z])/g, upperToHyphenLower);

    return element.getAttribute(`data-${key}`);
}

/**
 * Remove data property
 * @param {HTMLElement} element - target element
 * @param {string} key - key
 * @name removeData
 * @memberof tui.dom
 * @function
 */
export function removeData(element, key) {
    if (element.dataset) {
        delete element.dataset[key];

        return;
    }

    key = key.replace(/([A-Z])/g, upperToHyphenLower);

    element.removeAttribute(`data-${key}`);
}

/**
 * Remove element from parent node.
 * @param {HTMLElement} element - element to remove.
 * @name removeElement
 * @memberof tui.dom
 * @function
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
 * @memberof tui.dom
 * @function
 */
export function setBound(element, {top, right, bottom, left, width, height} = {}) {
    const args = {top, right, bottom, left, width, height};
    const newBound = {};

    snippet.forEach(args, (value, prop) => {
        if (snippet.isExisty(value)) {
            newBound[prop] = snippet.isNumber(value) ? `${value}px` : value;
        }
    });

    snippet.extend(element.style, newBound);
}

const elProto = Element.prototype;
const matchSelector = elProto.matches ||
    elProto.webkitMatchesSelector ||
    elProto.mozMatchesSelector ||
    elProto.msMatchesSelector ||
    function(selector) {
        const doc = this.document || this.ownerDocument;
        return snippet.inArray(this, findAll(doc, selector)) > -1;
    };

/**
 * Check element match selector
 * @param {HTMLElement} element - element to check
 * @param {string} selector - selector to check
 * @returns {boolean} is selector matched to element?
 * @name matches
 * @memberof tui.dom
 * @function
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
 * @memberof tui.dom
 * @function
 */
export function closest(element, selector) {
    let parent = element.parentNode;

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
 * @memberof tui.dom
 * @function
 */
export function find(element, selector) {
    if (snippet.isString(element)) {
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
 * @memberof tui.dom
 * @function
 */
export function findAll(element, selector) {
    if (snippet.isString(element)) {
        return snippet.toArray(document.querySelectorAll(element));
    }

    return snippet.toArray(element.querySelectorAll(selector));
}

/**
 * Stop event propagation.
 * @param {Event} e - event object
 * @name stopPropagation
 * @memberof tui.dom
 * @function
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
 * @memberof tui.dom
 * @function
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
 * @memberof tui.dom
 * @function
 * @example
 * //-- #1. Get Module --//
 * var domUtil = require('tui-dom'); // node, commonjs
 * var domUtil = tui.dom; // distribution file
 *
 * //-- #2. Use property --//
 * var props = ['transform', '-webkit-transform'];
 * domutil.testCSSProp(props);    // 'transform'
 */
function testCSSProp(props) {
    const {style} = document.documentElement;
    const len = props.length;

    for (let i = 0; i < len; i += 1) {
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
 * @memberof tui.dom
 * @function
 */
export function disableTextSelection(el = document) {
    let style;

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
 * @memberof tui.dom
 * @function
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
 * @memberof tui.dom
 * @function
 */
export function textContent(element) {
    if (snippet.isExisty(element.textContent)) {
        return element.textContent;
    }

    return element.innerText;
}

/**
 * Insert element to next of target element
 * @param {HTMLElement} element - html element to insert
 * @param {HTMLElement} target - target element
 * @name insertAfter
 * @memberof tui.dom
 * @function
 */
export function insertAfter(element, target) {
    const parent = target.parentNode;

    if (target === parent.lastChild) {
        parent.appendChild(element);
    } else {
        parent.insertBefore(element, target.nextSibling);
    }
}
