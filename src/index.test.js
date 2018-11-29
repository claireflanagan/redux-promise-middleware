import { isPromise, middleware } from './index';
import { applyMiddleware, createStore } from 'redux';

describe ('isPromise', () => {
  it('checks for a promise', () => {
    let action = {
      type: 'TEST',
      payload: 'hi'
    };
    expect(isPromise(action.payload)).toEqual(false);
  });
});

describe('middleware', () => {
  const reducer = jest.fn((state) => state);
  const store = createStore(reducer, applyMiddleware(middleware)); // middleware connected here

  it('resolves a promise then pushes payload to reducer', () => {
    const promise = Promise.resolve('Hi');
    store.dispatch({ //sent to reducer
      type: 'PROMISE_ACTION',
      payload: promise
    });

    return promise.then(() => {
      expect(reducer.mock.calls[2][1]).toEqual({ type: 'PROMISE_ACTION', payload: 'Hi' }); //checking that payload comes back as hi
    });
  });

  it('tests LOAD_START', () => {
    const promise = Promise.resolve('Hi');
    store.dispatch({
      type: 'TEST',
      payload: promise
    });

    return promise.then(() => {
      expect(reducer.mock.calls[1][1]).toEqual({ type: 'LOAD_START' });
    });

  });

  it('tests LOAD_END', () => {
    const promise = Promise.resolve('Hi');
    store.dispatch({
      type: 'TEST',
      payload: promise
    });

    return promise.then(() => {
      expect(reducer.mock.calls[3][1]).toEqual({ type: 'LOAD_END' });
    });

  });

});


