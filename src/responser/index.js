const {
  pipe,
  without,
  pathOr,
} = require('ramda');
const Boom = require('boom');

const excessiveBoomFunctionNames = [
  'length', 'prototype', 'isBoom', 'boomify', Symbol.hasInstance,
];

const essentialBoomFunctionNames = pipe(
  Reflect.ownKeys,
  without(excessiveBoomFunctionNames),
)(Boom);

const throwBoomFunction = (ctx, name) => (...args) => {
  const error = Boom[name](...args);

  ctx.request.type = 'application/json';
  ctx.response.status = error.output.statusCode;
  ctx.response.message = error.output.payload.error;
  ctx.response.body = error.output.payload;

  const headers = Object.assign(
    pathOr({}, ['request', 'headers'], ctx),
    pathOr({}, ['output', 'headers'], error),
  );

  Reflect.set(ctx.request, 'headers', headers);
};

const insertBoomFunctionsToContext = ctx => essentialBoomFunctionNames
  .map(name => Reflect.set(ctx.response, name, throwBoomFunction(ctx, name)));

const createResponse = (ctx, statusCode = 200, message = 'OK', data = null, type = 'application/json') => {
  const payload = {
    statusCode,
    message,
    data,
  };
  ctx.response.status = payload.statusCode;
  ctx.response.message = payload.message;
  ctx.response.body = payload;
  ctx.request.type = type;

  return payload;
};

const continueResponse = (ctx, data) => createResponse(ctx, 100, 'Continue', data);

const okResponse = (ctx, data) => createResponse(ctx, 200, 'OK', data);

const createdResponse = (ctx, data) => createResponse(ctx, 201, 'Created', data);

const acceptedResponse = (ctx, data) => createResponse(ctx, 202, 'Accepted', data);

const noContentResponse = (ctx, data) => createResponse(ctx, 204, 'No Content', data);

module.exports = (ctx, next) => {
  ctx.response.registerResponse = (name, response) => {
    ctx.response[name] = (...args) => response(ctx, ...args);
  };

  ctx.response.registerResponse('continue', continueResponse);
  ctx.response.registerResponse('ok', okResponse);
  ctx.response.registerResponse('created', createdResponse);
  ctx.response.registerResponse('accepted', acceptedResponse);
  ctx.response.registerResponse('noContent', noContentResponse);

  insertBoomFunctionsToContext(ctx);

  return next();
};
