const Magicable = require('../../src/magicable');

class CustomMagicableClass extends Magicable {
  constructor() {
    super();

    this.testVariable = 'works';
    this.invoked = 0;
  }

  __get(prop, receiver) {
    this.invoked += 1;

    return Reflect.get(this, prop, receiver);
  }

  __set(prop, value, receiver) {
    this.invoked += 1;

    return Reflect.set(this, prop, value, receiver);
  }
}

describe('Magicable methods', () => {
  test('Magic method get', () => {
    const magicable = new CustomMagicableClass();

    expect(magicable.testVariable).toMatch('works');
    expect(magicable.invoked).toBe(2);
  });

  test('Magic method set', () => {
    const magicable = new CustomMagicableClass();

    magicable.testVariable = 'works 2';

    expect(magicable.testVariable).toMatch('works 2');
    expect(magicable.invoked).toBe(3);
  });
});
