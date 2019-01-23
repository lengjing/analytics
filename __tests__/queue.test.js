import Queue from '../src/queue';

describe('queue', () => {
  var queue = new Queue();
  var queue2 = new Queue();
  var f1 = jest.fn((model) => { });
  var f2 = jest.fn((model) => { });
  var f3 = jest.fn((model, cb) => { cb(); });
  var f4 = jest.fn((model, cb) => { cb(); });
  var cb = jest.fn(() => { });

  var model = {
    _c: { f1, f2, f3, f4 },
    get(a) {
      return this._c[a];
    }
  }

  test('add method', () => {
    expect(queue.add('f1')).toBeUndefined();
    expect(queue.add('f2')).toBeUndefined();
    expect(queue2.add('f3')).toBeUndefined();
    expect(queue2.add('f4')).toBeUndefined();
  });

  test('exec', () => {
    queue.exec(model);
    expect(f1.mock.calls[0][0]).toEqual(model);
    expect(f2.mock.calls[0][0]).toEqual(model);
  });

  test('async exec', () => {
    queue2.execAsync(model, cb);
    expect(f3.mock.calls[0][0]).toEqual(model);
    expect(f4.mock.calls[0][0]).toEqual(model);
    expect(cb).toBeCalled();
  })
});