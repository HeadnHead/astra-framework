const { capitalize } = require('lodash');
const Magicable = require('../magicable');

class Manager extends Magicable {
  constructor() {
    super();

    this.resolved = new Map();
  }

  driver(name) {
    return this.createDriver(name || this.getDefaultDriver());
  }

  createDriver(name) {
    const driverMethod = `create${capitalize(name)}Driver`;

    if (!Reflect.has(this, driverMethod)) {
      throw new Error(`The driver [${name}] does not exist.`);
    }

    if (this.resolved.has(name)) {
      return this.resolved.get(name);
    }

    const resolvedDriver = this[driverMethod]();

    this.resolved.set(name, resolvedDriver);

    return resolvedDriver;
  }

  __get(prop, receiver) {
    if (Reflect.has(this.driver(), prop)) {
      return Reflect.get(this.driver(), prop, receiver);
    }
    return Reflect.get(this, prop, receiver);
  }
}

module.exports = Manager;
