import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducersDefinition from './reducersDefinition';

const createReducer = (type, initialState) => {
  return (state = initialState, action) => {
    if (action.type === type) {
      if (action.state === null) {
        return null;
      }

      return {
        ...state,
        ...action.state,
      };
    }

    return state;
  };
};

const reducers = reducersDefinition.reduce((acc, item) => {
  return {
    ...acc,
    [item.type]: createReducer(item.type, item.initialState),
  };
}, {});

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: reducersDefinition.filter(o => o.isPersistent).map(o => o.type),
};

const rootReducer = combineReducers(reducers);

const store = createStore(persistReducer(rootPersistConfig, rootReducer));
const persistor = persistStore(store);

const dispatch = (type, state) => {
  store.dispatch({
    type,
    state,
  });
};

export {store, persistor, dispatch};
