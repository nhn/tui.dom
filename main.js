import 'babel-polyfill';
import * as domutil from './src/domutil';
import * as domevent from './src/domevent';
tui.util.defineNamespace('dom', Object.assign({}, domutil, domevent));
