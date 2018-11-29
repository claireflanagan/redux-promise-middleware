
export const isPromise = payload => {
  return payload && typeof payload.then == 'function';
};

export const middleware = store => next => action => {
  if(!isPromise(action.payload)) {
    return next(action);
  }
  store.dispatch({
    type: 'LOAD_START'
  });
  return action.payload
    .then(results => {
      return next({
        type: action.type,
        payload: results
      });
    })
    .then(() => {
      store.dispatch({
        type: 'LOAD_END',
      });
    })
    .catch(error => {
      store.dispatch({
        type: 'LOAD_END'
      });
      store.dispatch({
        type: 'ERROR',
        payload: error
      });
    });
};
