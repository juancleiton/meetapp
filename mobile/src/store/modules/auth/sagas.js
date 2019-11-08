import { Alert } from 'react-native';

import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user)); // AQUI VAI DISPARAR O signInSuccess la da actions
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );

    yield put(signFailure()); // para tirar o loading
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });
    Alert.alert(
      'Cadastro efetuado com sucesso',
      'Efetue o login, clique em "Já tenho login"'
    );
  } catch (err) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados'
    );

    yield put(signFailure()); // para tirar o loading
  }
}

// Para salvar o token em todas as paginas
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
}

// FAZER LOGOUT, vai deslogar e levar para a pagina principal de login
export function signOut() {}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
