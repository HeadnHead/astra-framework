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
const fs = require('fs');
const path = require('path');

const getPathToProperty = split(/\.|\[|\]\.|\]/i);

const getProperty = property => when(always(!isEmpty(property)), getPath(property));

const Config = function constructor() {
  this.store = new Map();
};

Config.prototype.get = function get(property) {
  const pathToProperty = getPathToProperty(property);
  const store = this.store.get(head(pathToProperty));
  return getProperty(drop(1, pathToProperty))(store);
};

Config.prototype.set = function set(name, config) {
  if (is(String, name) && is(Object, config)) {
    this.store.set(name, config);
  }
};

Config.prototype.file = function getConfigFromFile(file) {
  if (!fs.existsSync(file)) {
    throw new Error('File does not exist.');
  }

  const { name } = path.parse(file);

  this.store.set(name, require(file)); // eslint-disable-line
};

Config.prototype.dir = function getConfigsFromDirectory(directory) {
  if (!fs.existsSync(directory)) {
    throw new Error('directory does not exist.');
  }

  const files = fs.readdirSync(directory);

  for (let i = files.length - 1; i >= 0; i - 1) {
    this.file(path.resolve(directory, files[i]));
  }
};

Config.prototype.clear = function clear() {
  return this.store.clear();
};

module.exports = Config;
