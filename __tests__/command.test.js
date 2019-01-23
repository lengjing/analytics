import Command from '../src/command';

describe('command', () => {
  test('callback command', () => {
    var callback = () => { }
    var command = new Command([callback]);

    expect(command.readyCallback).toEqual(callback);
    expect(command.trackerName).toBeUndefined();
  });

  test('set command', () => {
    var command = new Command(['tracker1.set', 'foo', 1]);

    expect(command.trackerName).toBe('tracker1');
    expect(command.methodName).toBe('set');
    expect(command.isCreateCommand).toBe(false);
    expect(command.isRemoveCommand).toBe(false);
    expect(command.fields).toEqual(['foo', 1]);
  });
});