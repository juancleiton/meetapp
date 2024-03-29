import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

// import { Container } from './styles';

export default function Index() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#22202c" />
          <App />
        </PersistGate>
      </Provider>
    </>
  );
}

console.disableYellowBox = true; // Para tirar o erro amarelo de warning
