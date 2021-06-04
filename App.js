import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import persist from './src/store/store';
import Routes from './src/Routes';
import config from './src/settings';


/**
 *
 *
 * <Provider store={persistStorage.store}>
      <PersistGate
        loading={
          <ActivityIndicator
            //loadingMessage={'loading STOW App...'}
            size="large"
            //color={config.themeDefault.COLORS.stowBlue}
          />
        }
        persistor={persistStorage.persistor}>
        <Routes />
      </PersistGate>
    </Provider>
 *
 */

const persistStorage = persist();

export default function App() {
  //console.log(persistStorage.store);
  //console.log(persistStorage.persistor);

  return (
    <Provider store={persistStorage.store}>
      <PersistGate
        loading={
          <ActivityIndicator
            //loadingMessage={'loading STOW App...'}
            size="large"
            //color={config.themeDefault.COLORS.stowBlue}
          />
        }
        persistor={persistStorage.persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
