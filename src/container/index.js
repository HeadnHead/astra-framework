const Bottle = require('bottlejs');

Bottle.prototype.make = function make(name) {
  return this.container.container[name];
};

module.exports = Bottle;
