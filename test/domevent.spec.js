import * as domevent from '../src/js/domevent';

describe('The domevent module', function() {
    let btn, spy;

    beforeEach(function() {
        fixture.set('<button id="test">test</button>' +
                    '<div id="abs" style="position:absolute;left:10px:top:10px">a</div>');

        btn = document.querySelector('#test');
        spy = jasmine.createSpy('domevent.on');
    });

    afterEach(function() {
        fixture.cleanup();
    });

    it('can check mouseleave event fired by enter child element.', function() {
        const el = {};
        let mockEvent = {
            relatedTarget: {
                parentNode: {
                    parentNode: el
                }
            }
        };

        expect(domevent.checkMouse(el, mockEvent)).toBe(false);

        mockEvent = {
            relatedTarget: {
                parentNode: {
                    parentNode: null
                }
            }
        };

        expect(domevent.checkMouse(el, mockEvent)).toBe(true);

        expect(domevent.checkMouse(el, {})).toBe(true);
    });

    it('can bind DOM event.', function() {
        domevent.on(btn, 'click', spy);

        expect(btn._feEventKey.click.has(spy)).toBe(true);
        expect(btn._feEventKey.click.size).toBe(1);
    });

    it('can unbind DOM event.', function() {
        domevent.on(btn, 'click', spy);
        domevent.off(btn, 'click', spy);

        expect(btn._feEventKey.click.has(spy)).toBe(false);
        expect(btn._feEventKey.click.size).toBe(0);
    });

    it('unbind all event for same type name and handler.', function() {
        const spy2 = jasmine.createSpy('spy2');

        domevent.on(btn, 'click', spy);
        domevent.on(btn, 'click', spy);
        domevent.on(btn, 'click', spy2);

        expect(btn._feEventKey.click.has(spy)).toBe(true);
        expect(btn._feEventKey.click.size).toBe(2);
        expect(btn._feEventKey.click.get(spy)).toEqual([
            jasmine.any(Function),
            jasmine.any(Function)
        ]);

        domevent.off(btn, 'click', spy);

        expect(btn._feEventKey.click.has(spy)).toBe(false);
        expect(btn._feEventKey.click.size).toBe(1);

        // spy2 must not unbind at this moment.
        expect(btn._feEventKey.click.get(spy2)).toEqual([
            jasmine.any(Function)
        ]);
    });

    it('can calculate mouse cursor position relative by other element.', function() {
        const relativeElement = document.querySelector('#abs');
        const pos = relativeElement.getBoundingClientRect();
        const mouseEvent = {
            clientY: 30,
            clientX: 30
        };

        expect(domevent.getMousePosition(mouseEvent, relativeElement))
            .toEqual([30 - pos.left, 30 - pos.top]);
    });

    it('should distinguish which mouse button was clicked depending on browser type', function() {
        const isStandardMouseEvent = !domevent._isIE8AndEarlier();

        if (isStandardMouseEvent) {
            expect(domevent.getMouseButton({button: 0})).toBe(0);
            expect(domevent.getMouseButton({button: 1})).toBe(1);
            expect(domevent.getMouseButton({button: 2})).toBe(2);
        } else {
            expect(domevent.getMouseButton({button: 1})).toBe(0);
            expect(domevent.getMouseButton({button: 4})).toBe(1);
            expect(domevent.getMouseButton({button: 2})).toBe(2);
        }
    });

    it('should nomalize mouse event ', function() {
        expect(domevent._getMouseButtonIE8AndEarlier({button: 0})).toBe(0);
        expect(domevent._getMouseButtonIE8AndEarlier({button: 1})).toBe(0);
        expect(domevent._getMouseButtonIE8AndEarlier({button: 3})).toBe(0);
        expect(domevent._getMouseButtonIE8AndEarlier({button: 5})).toBe(0);
        expect(domevent._getMouseButtonIE8AndEarlier({button: 7})).toBe(0);
        expect(domevent._getMouseButtonIE8AndEarlier({button: 2})).toBe(2);
        expect(domevent._getMouseButtonIE8AndEarlier({button: 6})).toBe(2);
        expect(domevent._getMouseButtonIE8AndEarlier({button: 4})).toBe(1);
    });
});
