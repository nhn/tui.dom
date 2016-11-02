import * as domevent from '../src/domevent';

describe('The domevent module', function() {
    var btn, spy;

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
        var el = {};
        var mockEvent = {
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
        var spy2 = jasmine.createSpy('spy2');

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
        var relativeElement = document.querySelector('#abs');
        var pos = relativeElement.getBoundingClientRect();
        var mouseEvent = {
            clientY: 30,
            clientX: 30
        };

        expect(domevent.getMousePosition(mouseEvent, relativeElement))
            .toEqual([30 - pos.left, 30 - pos.top]);
    });
});
