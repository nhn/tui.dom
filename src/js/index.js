import * as domevent from './domevent';
import * as domutil from './domutil';
import snippet from 'tui-code-snippet';

/**
 * @fileoverview
 * @author NHN Ent.
 *         FE Development Lab <dl_javascript@nhnent.com>
 * @namespace tui.dom
 * @desc DOM manipulation utilities
 * @example
 * // node, commonjs
 * var domUtil = require('tui-dom');
 * domUtil.addClass(element, 'foo', 'bar');
 * @example
 * // distribution file, script
 * <script src='path/to/tui-dom.js'></script>
 * <script>
 * var domUtil = tui.dom;
 * domUtil.addClass(element, 'foo', 'bar');
 * </script>
 */
module.exports = snippet.extend({}, domutil, domevent);
