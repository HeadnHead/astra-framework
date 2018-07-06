const request = require('supertest');

const App = require('../index.js');
const Config = require('../src/config');

let app = null;

beforeEach(() => {
  app = new App();
});

describe('Application', () => {
  describe('services', () => {
    describe('Config', () => {
      it('Config instance test', async () => {
        expect(app.make('config'))
          .toBeInstanceOf(Config);

        app.use(async ({ make }) => {
          expect(make('config'))
            .toBeInstanceOf(Config);
        });

        const response = await request(app.callback()).get('');

        expect(response.status).toBe(404);
      });
    });

    describe('Responser', () => {
      it('Error response', async () => {
        app.use(async (ctx) => {
          ctx.response.forbidden();
        });

        const response = await request(app.callback()).get('');

        expect(response.body).toMatchObject({
          statusCode: 403,
          message: 'Forbidden',
          error: 'Forbidden',
        });
      });

      it('Regular response', async () => {
        app.use(async (ctx) => {
          ctx.response.ok();
        });

        const response = await request(app.callback()).get('');

        expect(response.body).toMatchObject({
          statusCode: 200,
          message: 'OK',
        });
      });
    });
  });
});
