import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
//import ReduxThunk from 'redux-thunk';
import CreateSagaMiddleware from 'redux-saga';

// Sagas
import { fetchCollectionsStart } from './shop/shop.sagas.js';

import rootReducer from './root-reducer';

const sagaMiddleware = CreateSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(fetchCollectionsStart);

export const persistor = persistStore(store);
