/* eslint require-jsdoc: 0 */
var domutil = window.dom;

var NO_SVG = tui.util.browser.msie && tui.util.browser.version < 9;

function $(selector) {
    return document.querySelector(selector);
}

describe('domutil', function() {
    beforeEach(function() {
        fixture.set(
            '<style>html, body {margin:0; padding:0;}</style>' +
            '<div id="test"></div>' +
            '<div id="test2" class="test-class"></div>' +
            '<div id="test3" style="position:absolute;z-index:1;top:10px;' +
                'left:20px;width:100px;height:50px;border:1px solid #ccc;"></div>' +
            '<div id="test4" class="test-class test-class2"></div>' +
            '<svg width="300" height="300">' +
                '<rect class="origin" id="rect" x="10" y="10" width="50" height="50"></rect>' +
            '</svg>'
        );
    });

    afterEach(function() {
        fixture.cleanup();
    });

    it('can detect element\' classnames.', function() {
        expect(domutil.getClass($('#test2'))).toBe('test-class');

        if (!NO_SVG) {
            expect(domutil.getClass($('#rect'))).toBe('origin');
        }
    });

    it('can change element\'s style values.', function() {
        var el = $('#test');
        domutil.css(el, 'color', 'red');
        expect(el.style.color).toBe('red');

        domutil.css(el, {
            marginLeft: '10px',
            marginRight: '5px'
        });

        expect(el.style.marginLeft).toBe('10px');
        expect(el.style.marginRight).toBe('5px');
    });

    it('can change element\'s classname.', function() {
        var el = $('#test2');
        var svgRect;

        domutil.addClass(el, 'test-class');
        expect(el.getAttribute('class')).toBe('test-class');

        domutil.addClass(el, 'good', 'good2');
        expect(el.getAttribute('class')).toBe('test-class good good2');

        if (!NO_SVG) {
            svgRect = $('#rect');
            domutil.addClass(svgRect, 'test-class');
            expect(svgRect.className.baseVal).toBe('origin test-class');
        }
    });

    it('can remove element\'s classname.', function() {
        domutil.removeClass($('#test4'), 'test-class');
        expect($('#test4').getAttribute('class')).toBe('test-class2');

        $('#test').setAttribute('class', 'a a b c');

        domutil.removeClass($('#test'), 'a', 'c');
        expect($('#test').getAttribute('class')).toBe('b');

        if (!NO_SVG) {
            var svgRect = $('#rect');
            domutil.removeClass(svgRect, 'origin');
            expect(svgRect.className.baseVal).toBe('');
        }
    });

    it('can detect element\'s style value.', function() {
        var rect = domutil.getRect($('#test3'));

        expect(rect.top).toBe(10);
        expect(rect.right).toBe(122);
        expect(rect.bottom).toBe(62);
        expect(rect.left).toBe(20);
        expect(rect.width).toBe(102);
        expect(rect.height).toBe(52);
    });

    it('check element has specific css class names.', function() {
        expect(domutil.hasClass($('#test'), 'test-class')).toBe(false);
        expect(domutil.hasClass($('#test2'), 'test-class')).toBe(true);
    });

    it('can manipulate element custom data', function() {
        var el;

        fixture.set('<div id="_test" data-test="good"></div>');

        el = $('#_test');

        expect(domutil.getData(el, 'test')).toBe('good');
        expect(domutil.getData(el, 'noexist')).toBeFalsy();

        domutil.setData(el, 'hello', 'world');
        expect(domutil.getData(el, 'hello')).toBe('world');

        domutil.removeData(el, 'test');
        expect(domutil.getData(el, 'test')).toBeFalsy();
    });

    it('should set container\'s size and position.', function() {
        var el = $('#test');

        domutil.setBound(el, {width: 120, height: '20%', bottom: 20});

        expect(el.style.width).toBe('120px');
        expect(el.style.height).toBe('20%');
        expect(el.style.bottom).toBe('20px');

        domutil.setBound(el, {left: 5});

        expect(el.style.left).toBe('5px');
    });

    it('should check element is matched supplied selector.', function() {
        expect(domutil.matches($('#test'), '#test')).toBe(true);
        expect(domutil.matches($('#test'), '.nomatch')).toBe(false);
    });

    describe('closest method', function() {
        beforeEach(function() {
            fixture.set('<div id="parent">' +
                        '<ul id="test">' +
                        '<li id="list-item">test</li>' +
                        '</ul>' +
                        '</div>');
        });

        afterEach(function() {
            fixture.cleanup();
        });

        it('return matched parent node recursively until meet document.', function() {
            var li = document.getElementById('list-item');
            expect(domutil.closest(li, '#list-item')).toBe(li);

            li = document.getElementById('list-item');
            expect(domutil.closest(li, '#parent')).toBe(document.getElementById('parent'));
        });

        it('reutrn null when no closest parent node.', function() {
            var li = document.getElementById('list-item');
            expect(domutil.closest(li, '#notexist')).toBe(null);
        });

        it('work with no rendered element.', function() {
            var div, li;

            div = document.createElement('div');
            div.setAttribute('id', 'good');
            div.innerHTML = '<ul><li id="testtest">123</li></ul>';

            li = div.querySelector('#testtest');

            expect(domutil.closest(li, '#good')).toBe(div);
        });

        it('return itself when no parent node.', function() {
            var div = document.createElement('div');
            expect(domutil.closest(div, '#good')).toBe(null);
        });
    });

    it('can find single element', function() {
        expect(domutil.find('#test')).toBe($('#test'));
    });

    it('can find multiple element', function() {
        expect(domutil.findAll('.test-class').length).toBe(2);
        expect(domutil.findAll('.test-class.test-class2')[0]).toBe($('#test4'));
    });

    it('should insert element to next of another element.', function() {
        var li = document.createElement('li');

        fixture.set('<ul><li id="list-1"></li><li id="list-2"></li></ul>');

        domutil.insertAfter(li, document.getElementById('list-1'));

        expect(document.querySelector('li#list-1').nextSibling).toBe(li);
    });

    it('should insert element to next of another element. even if anoter' +
            'element is last child of parent node.', function() {
        var li = document.createElement('li');

        fixture.set('<ul><li id="list-1"></li><li id="list-2"></li></ul>');

        domutil.insertAfter(li, document.getElementById('list-2'));

        expect(document.querySelector('li#list-2').nextSibling).toBe(li);
    });
});
