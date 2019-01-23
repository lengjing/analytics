import ma from '../src/ma';

describe('ma', () => {

  it('add tracker1', (done) => {
    ma.create({ name: 'tracker1' });
    expect(ma.getByName('tracker1')).not.toBeUndefined();
    done();
  });

  it('remove tracker1', (done) => {
    ma.remove('tracker1');
    expect(ma.getByName('tracker1')).toBeNull();
    done();
  });

  it('set value', (done) => {
    expect(ma('set', 'foo', 1)).toBeUndefined();
    done();
  });

  it('get value', (done) => {
    var tracker = ma.getByName('t0');
    expect(tracker.get('foo')).toBe(1);
    done();
  });

  it('set spec tracker value', (done) => {
    ma.create({ name: 'tracker2' });
    expect(ma('tracker2.set', 'bar', 2)).toBeUndefined();
    done();
  });

  it('get spec tracker value', (done) => {
    var tracker2 = ma.getByName('tracker2');
    expect(tracker2.get('bar')).toBe(2);
    done();
  });

  it('set hook value', (done) => {
    expect(ma('set', { biz: { c: 1 } })).toBeUndefined();
    done();
  });

  it('get biz value', (done) => {
    expect(ma('set', { biz: { c: 1 } })).toBeUndefined();
    done();
  });
});