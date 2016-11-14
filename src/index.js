import util from 'code-snippet';
import * as domutil from './domutil';
import * as domevent from './domevent';

/**
 * @namespace tui.dom
 * @desc DOM manipulation utilities
 * @example
 * tui.dom.addClass(element, 'foo', 'bar');
 */
util.defineNamespace('tui.dom', util.extend({}, domutil, domevent));
