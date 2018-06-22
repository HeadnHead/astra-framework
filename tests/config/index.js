const Config = require('../../src/config');

const config = new Config();

beforeAll(() => config.clear());

const storeName = 'testStore';

const nestedValue = 'works';

const store = {
  variable: {
    nestedVariable: nestedValue,
  },
};

const storePath = 'variable.nestedVariable';
const storePathWithStoreName = `${storeName}.${storePath}`;

describe('Configuration', () => {
  test('Setting and getting configuration into storage', () => {
    config.set(storeName, store);

    expect(config.get(storeName)).toEqual(store);
    expect(config.get(storeName)).toHaveProperty(storePath, nestedValue);
    expect(config.get(storePathWithStoreName)).toEqual(nestedValue);
  });
});
