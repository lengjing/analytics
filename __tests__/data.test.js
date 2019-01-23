import Data from '../src/data';

describe('data', () => {
  let data = new Data();
  test('set value', () => {
    expect(data.set('foo', 1)).toBeUndefined();
  });

  test('set temporary value', () => {
    expect(data.set('bar', 2, true)).toBeUndefined();
  });

  test('get value', () => {
    expect(data.get('foo')).toBe(1);
    expect(data.get('bar')).toBe(2);
  });

  test('map function', () => {
    var cb = jest.fn((v => v));
    var data2 = new Data();
    data2.set('a', 1);
    data2.set('b', 2);
    data2.set('c', 3);
    data2.map(cb);

    expect(cb).toBeCalledTimes(3);
    expect(cb.mock.calls[0][0]).toBe('a');
    expect(cb.mock.calls[1][0]).toBe('b');
    expect(cb.mock.calls[2][0]).toBe('c');

    expect(cb.mock.calls[0][1]).toBe(1);
    expect(cb.mock.calls[1][1]).toBe(2);
    expect(cb.mock.calls[2][1]).toBe(3);
  })
});