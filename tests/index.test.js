const App = require('../index.js');
const Config = require('../src/config');

describe('Creates application', () => {
  const app = new App();

  test('Config instance test', () => {
    expect(app.make('config'))
      .toBeInstanceOf(Config);
  });
});
