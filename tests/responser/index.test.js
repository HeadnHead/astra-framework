const useResponder = require('../../src/responser');

const context = {
  response: {},
  request: {},
};

beforeEach(() => {
  context.response = {};
});

describe('Responder', () => {
  it('middleware()', () => {
    useResponder(context, () => {});

    expect(context.response).toEqual(expect.objectContaining({
      forbidden: expect.any(Function),
    }));
  });

  it('registerResponse()', () => {
    useResponder(context, () => {});

    const customResponse = (ctx, attributes) => {
      ctx.response.status = 422;
      ctx.response.message = 'The given data is invalid.';
      ctx.response.body = {
        statusCode: 422,
        error: 'The given data is invalid.',
        attributes,
      };
    };

    context.response.registerResponse('customResponse', customResponse);

    const attributes = {
      name: 'should be a string',
    };

    context.response.customResponse(attributes);

    expect(context.response).toEqual(expect.objectContaining({
      status: 422,
      message: 'The given data is invalid.',
      body: {
        statusCode: 422,
        error: 'The given data is invalid.',
        attributes,
      },
    }));
  });

  it('continue()', () => {
    useResponder(context, () => {});

    const data = {
      custom: 'value',
    };

    context.response.continue(data);

    expect(context.response).toEqual(expect.objectContaining({
      status: 100,
      message: 'Continue',
      body: {
        statusCode: 100,
        message: 'Continue',
        data,
      },
    }));
  });

  it('ok()', () => {
    useResponder(context, () => {});

    const data = {
      custom: 'value',
    };

    context.response.ok(data);

    expect(context.response).toEqual(expect.objectContaining({
      status: 200,
      message: 'OK',
      body: {
        statusCode: 200,
        message: 'OK',
        data,
      },
    }));
  });

  it('created()', () => {
    useResponder(context, () => {});

    const data = {
      custom: 'value',
    };

    context.response.created(data);

    expect(context.response).toEqual(expect.objectContaining({
      status: 201,
      message: 'Created',
      body: {
        statusCode: 201,
        message: 'Created',
        data,
      },
    }));
  });

  it('accepted()', () => {
    useResponder(context, () => {});

    const data = {
      custom: 'value',
    };

    context.response.accepted(data);

    expect(context.response).toEqual(expect.objectContaining({
      status: 202,
      message: 'Accepted',
      body: {
        statusCode: 202,
        message: 'Accepted',
        data,
      },
    }));
  });

  it('noContent()', () => {
    useResponder(context, () => {});

    const data = {
      custom: 'value',
    };

    context.response.noContent(data);

    expect(context.response).toEqual(expect.objectContaining({
      status: 204,
      message: 'No Content',
      body: {
        statusCode: 204,
        message: 'No Content',
        data,
      },
    }));
  });

  it('insertBoomFunctionsToContext()', () => {
    useResponder(context, () => {});

    context.response.forbidden('custom message');
    expect(context.response).toEqual(expect.objectContaining({
      status: 403,
      message: 'Forbidden',
      body: {
        statusCode: 403,
        error: 'Forbidden',
        message: 'custom message',
      },
    }));

    context.response.unauthorized('invalid password', 'sample');
    expect(context.request).toEqual(expect.objectContaining({
      headers: {
        'WWW-Authenticate': 'sample error="invalid password"',
      },
    }));
    expect(context.response).toEqual(expect.objectContaining({
      status: 401,
      message: 'Unauthorized',
      body: {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'invalid password',
        attributes: {
          error: 'invalid password',
        },
      },
    }));
  });
});
