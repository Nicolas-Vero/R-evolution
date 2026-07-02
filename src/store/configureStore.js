import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reduxReset from 'redux-reset';
import rootReducer from '../reducers/index';

const enhancers = [];
const middlewares = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // We can blacklist and whitelist specifics reducers to be persisted if we want
};

const resetMiddleware = (store) => (next) => (action) => {
  // Here we totally reset the state and persisted values on logout
  if (action.type === 'UNAUTH_USER') {
    AsyncStorage.clear(); // TODO we might want to clear all key except "locale"
    store.dispatch({
      type: 'RESET',
    });
  }

  next(action);
};

// Middleware: Redux Logger (For Development)
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

middlewares.push(resetMiddleware);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  reduxReset(),
  ...enhancers,
);

export default () => {
  const store = createStore(persistedReducer, undefined, composedEnhancers);
  return { store, persistor: persistStore(store) };
};
