import { Alert } from 'react-native';

import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    // Unir dois objetos, se existir o campo oldPassword, vai colocar dentro da variavel rest
    // eslint-disable-next-line prefer-object-spread
    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');

    // Vai disparar essa action, pegando a variavel response, que recebeu os dados na variavel profile passado logo acima
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização do perfil, verifique seus dados'
    );

    yield put(updateProfileFailure()); // para tirar o loading
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
