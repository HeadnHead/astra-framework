/* eslint class-methods-use-this: "off" */
const proxy = require('./proxy');

class Magicable {
  constructor() {
    return proxy(this);
  }

  __get(prop, receiver) {
    return Reflect.get(this, prop, receiver);
  }

  __set(prop, value, receiver) {
    return Reflect.set(this, prop, value, receiver);
  }
}

module.exports = Magicable;
