const Bottle = require('bottlejs');

Bottle.prototype.make = function make(name) {
  return this.container[name];
};

module.exports = Bottle;
