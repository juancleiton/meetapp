import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (__DEV__) {
  const tron = Reactotron.configure({
    host: '192.168.1.107',
  })
    .setAsyncStorageHandler(AsyncStorage) // Para o Reactotron nao criar varias conexoes, importar com o Async-storage
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
