const {
  head,
  when,
  isEmpty,
  always,
  path: getPath,
  split,
  drop,
  is,
} = require('ramda');

const splitPathToArray = split(/\.|\[|\]\.|\]/i);

const getProperty = path => when(always(!isEmpty(path)), getPath(path));

const Config = function constructor() {
  this.store = new Map();
};

Config.prototype.get = function get(path) {
  const arrayedPath = splitPathToArray(path);
  const store = this.store.get(head(arrayedPath));
  return getProperty(drop(1, arrayedPath))(store);
};

Config.prototype.set = function set(name, config) {
  if (is(String, name) && is(Object, config)) {
    this.store.set(name, config);
  }
};

Config.prototype.clear = function clear() {
  return this.store.clear();
};

module.exports = Config;
