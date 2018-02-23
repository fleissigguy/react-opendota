import { createStore, applyMiddleware, Store, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from '../middleware';
import reducers  from '../reducers';

export function configureStore(initialState?) {
  let middlewares = compose(applyMiddleware(thunk, logger));


  if (process.env.NODE_ENV === 'development') {
    middlewares = composeWithDevTools(middlewares);
  }

  const store = createStore(
    reducers,
    middlewares
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
