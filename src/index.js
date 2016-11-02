import util from 'code-snippet';
import * as domutil from './domutil';
import * as domevent from './domevent';

/** @namespace tui */
/** @namespace tui.dom */
util.defineNamespace('tui.dom', util.extend({}, domutil, domevent));
