import { transformInput } from '../../src/util/share';

describe('util', () => {
  test('transformInput([foo, bar], [1, 2]) should be equal to {foo: 1, bar: 2}', () => {
    expect(transformInput(['foo', 'bar'], [1, 2])).toEqual({ foo: 1, bar: 2 });
  });

  test('transformInput([foo, bar], [1, 2, 3]) should be equal to {}', () => {
    expect(transformInput(['foo', 'bar'], [1, 2, 3])).toEqual({});
  });

  test('transformInput([foo, bar], [{foo: 1, bar: 2, a: 3}]) should be equal to {foo: 1, bar: 2}', () => {
    expect(transformInput(['foo', 'bar'], [{ foo: 1, bar: 2, a: 3 }])).toEqual({ foo: 1, bar: 2, a: 3 });
  });

  test('transformInput([foo, bar], [{foo: 1, bar: 2, a: 3}, 4]) should be equal to {foo: 1, bar: 2, a: 3}', () => {
    expect(transformInput(['foo', 'bar'], [{ foo: 1, bar: 2, a: 3 }, 4])).toEqual({ foo: 1, bar: 2, a: 3 });
  });
});
