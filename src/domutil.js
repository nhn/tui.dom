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
 * Set data attribute to target element
 * @param {HTMLElement} element - element to set data attribute
 * @param {string} key - key
 * @param {string} value - value
 */
export function setData(element, key, value) {
    if (element.dataset) {
        element.dataset[key] = value;

        return;
    }

    element.setAttribute('data-' + key, value);
}

/**
 * Get data value from data-attribute
 * @param {HTMLElement} element - target element
 * @param {string} key - key
 * @returns {string} value
 */
export function getData(element, key) {
    if (element.dataset) {
        return element.dataset[key];
    }

    return element.getAttribute('data-' + key);
}

/**
 * Remove data property
 * @param {HTMLElement} element - target element
 * @param {string} key - key
 */
export function removeData(element, key) {
    if (element.dataset) {
        delete element.dataset[key];

        return;
    }

    element.removeAttribute('data-' + key);
}

/**
 * Remove element from parent node.
 * @param {HTMLElement} element - element to remove.
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
 */
export function matches(element, selector) {
    return matchSelector.call(element, selector);
}

/**
 * Find parent element recursively
 * @param {HTMLElement} element - base element to start find
 * @param {string} selector - selector string for find
 * @returns {HTMLElement} - element finded or null
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
 */
export function disableTextSelection() {
    var style;

    if (SUPPORT_SELECTSTART) {
        domevent.on(document, 'selectstart', preventDefault);
    } else {
        style = document.documentElement.style;
        prevSelectStyle = style[userSelectProperty];
        style[userSelectProperty] = 'none';
    }
}

/**
 * Enable browser's text selection behaviors.
 */
export function enableTextSelection() {
    if (SUPPORT_SELECTSTART) {
        domevent.off(document, 'selectstart', preventDefault);
    } else {
        document.documentElement.style[userSelectProperty] = prevSelectStyle;
    }
}

/**
 * Disable browser's image drag behaviors.
 */
export function disableImageDrag() {
    domevent.on(document, 'dragstart', preventDefault);
}

/**
 * Enable browser's image drag behaviors.
 */
export function enableImageDrag() {
    domevent.off(document, 'dragstart', preventDefault);
}

/**
 * Represents the text content of a node and its descendants
 * @param {HTMLElement} element - html element
 * @returns {string} text content
 */
export function textContent(element) {
    if (util.isExisty(element.textContent)) {
        return element.textContent;
    }

    return element.innerText;
}
