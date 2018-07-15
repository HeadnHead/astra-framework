/* eslint no-underscore-dangle: "off" */

const handler = {
  get(target, prop, receiver) {
    if (Reflect.has(target, '__get')) {
      return target.__get(prop, receiver, target);
    }
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    if (Reflect.has(target, '__set')) {
      return target.__set(prop, value, receiver, target);
    }
    return Reflect.set(target, prop, value, receiver);
  },
};

module.exports = object => new Proxy(object, handler);
