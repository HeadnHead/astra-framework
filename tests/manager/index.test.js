/* eslint class-methods-use-this: off */
const Manager = require('../../src/manager');

class Driver {
  constructor(name) {
    this.name = name;
  }
}

class CustomManager extends Manager {
  createCustomDriver() {
    return new Driver('custom');
  }

  createDefaultDriver() {
    return new Driver('default');
  }

  getDefaultDriver() {
    return 'default';
  }
}

describe('Manager', () => {
  const manager = new CustomManager();

  test('Call default driver without reference', () => {
    expect(manager.name).toMatch('default');
    expect(manager.resolved.size).toBe(1);
    expect(manager.resolved.has('default')).toBeTruthy();
  });

  test('Call default driver', () => {
    expect(manager.driver('default').name).toMatch('default');
    expect(manager.resolved.size).toBe(1);
    expect(manager.resolved.has('default')).toBeTruthy();
  });

  test('Call custom driver', () => {
    expect(manager.driver('custom').name).toMatch('custom');
    expect(manager.resolved.size).toBe(2);
    expect(manager.resolved.has('custom')).toBeTruthy();
  });

  test('Call undefined driver', () => {
    expect(() => manager.driver('undefined').name).toThrow('The driver [undefined] does not exist.');
  });
});
