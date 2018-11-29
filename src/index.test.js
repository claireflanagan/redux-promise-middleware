import { isPromise, middleware } from 'index';

describe('middleware', () => {
  it('calls next with the dispatched action if action is not a function', () => {
    const reducer = jest.fn();
    const store = createStore(reducer, applyMiddleware(isPromise));

  });
});


