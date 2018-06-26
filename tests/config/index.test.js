const Config = require('../../src/config');

const config = new Config();

beforeEach(() => config.clear());


describe('Configuration', () => {
  test('Setting and getting configuration into storage', () => {
    const storeName = 'testStore';

    const nestedValue = 'works';

    const store = {
      variable: {
        nestedVariable: nestedValue,
      },
    };

    const storePath = 'variable.nestedVariable';
    const storePathWithStoreName = `${storeName}.${storePath}`;

    config.set(storeName, store);

    expect(config.get(storeName)).toEqual(store);
    expect(config.get(storeName)).toHaveProperty(storePath, nestedValue);
    expect(config.get(storePathWithStoreName)).toEqual(nestedValue);
  });

  test('Require configuration file', () => {
    const storeName = 'test-config';

    config.file(`${__dirname}/configs/${storeName}.js`);

    expect(config.get(`${storeName}.configuration`))
      .toEqual('first configuration');
  });

  test('Require configuration directory', () => {
    config.dir(`${__dirname}/configs`);

    expect(config.get('test-config.configuration'))
      .toEqual('first configuration');
    expect(config.get('test-config-2.configuration'))
      .toEqual('second configuration');
  });
});
