const {
  path,
} = require('ramda');
const Koa = require('koa');
const Container = require('./src/container');
const Config = require('./src/config');
const useResponser = require('./src/responser');
const loggerProvider = require('./providers/logger-provider');

class Astra extends Koa {
  constructor(options) {
    super();

    // Register Service Container
    this.context.container = new Container();
    this.context.make = this.context.container.make;

    // Register services
    this.resolveBaseServiceProviders(options);
  }

  resolveBaseServiceProviders(options) {
    this.context.container.factory('config', () => {
      const config = new Config();

      if (path('configDir', options)) {
        config.dir(options.configDir);
      }

      return config;
    });

    this.context.container.factory('logger', loggerProvider);

    this.use(useResponser);
  }

  make(...args) {
    return this.context.make(...args);
  }

  createContext(req, res) {
    const { make, container } = this.context;
    const context = super.createContext(req, res);
    context.make = make.bind(context);
    context.container = container;
    return context;
  }
}

module.exports = Astra;
