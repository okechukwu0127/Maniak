import AsyncStorage from '@react-native-community/async-storage';

import thunk from 'redux-thunk';
//import logger from 'redux-logger'

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/rootReducer';

import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'authReducerFeed',
    //'PropertyFeed',
    //'MyProjectFeed',
   // 'NotificationFeed',
  ],
  //blacklist:[]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};

//const store = createStore(    rootReducer,  applyMiddleware(thunk));
//export default store;
