import Hook, { setHook, setReadonlyHook, getHook } from '../src/hook';
import Model from '../src/model';

describe('hook', () => {
  var model = new Model();
  var foo = setHook('foo', 'f', 1);
  var a = setHook('a', 'a', undefined, (model) => model.get(foo));
  var b = setHook('b', 'b', undefined, undefined, (model, fieldName, fieldValue) => model.data.set(fieldName, '~' + fieldValue));

  var bar = setReadonlyHook('bar', 'b', 2);

  test('set hook', () => {
    expect(foo).toBe('foo');
  });

  test('set readOnly hook', () => {
    expect(bar).toBe('bar');
  });

  test('get hook', () => {
    expect(getHook(foo)).toBeInstanceOf(Hook);
    expect(getHook(bar)).toBeInstanceOf(Hook);

    expect(model.get(foo)).toBe(1);
    expect(model.get(a)).toBe(1);
    expect(model.get(b)).toBeUndefined();

    model.set(foo, 2);
    model.set(b, 'bb');

    expect(model.get(foo)).toBe(2);
    expect(model.get(a)).toBe(2);
    expect(model.get(b)).toBe('~bb');

    expect(model.get(bar)).toBe(2);
    model.set(bar, 3);
    expect(model.get(bar)).toBe(2);
  });

});