import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { StatusBar, YellowBox, Platform } from 'react-native';
import Routes from './src/routes';
import { decode, encode } from 'base-64'

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

YellowBox.ignoreWarnings(["Require cycle: src/redux/actions/index.js", "Warning: Can't perform a React state update on an unmounted component."]);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : "default"} backgroundColor="#000" />
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
