import Model from '../src/model';

describe('model', () => {
  var model = new Model();

  test('set value', () => {
    expect(model.set('foo', 1)).toBeUndefined();
  });

  test('set temporary value', () => {
    expect(model.set('bar', 2, true)).toBeUndefined();
  });

  test('set object value', () => {
    expect(model.set({ a: 3, b: 4 })).toBeUndefined();
  });

  test('get value', () => {
    expect(model.get('foo')).toBe(1);
    expect(model.get('bar')).toBe(2);

    expect(model.get('a')).toBe(3);
    expect(model.get('b')).toBe(4);
  });

  test('clear temporary data', () => {
    model.clearTmpData();

    expect(model.get('foo')).toBe(1);
    expect(model.get('bar')).toBeUndefined();
    expect(model.get('a')).toBe(3);
    expect(model.get('b')).toBe(4);
  });
});