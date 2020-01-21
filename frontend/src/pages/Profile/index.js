import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';
import { Container, Content, Button } from './styles';

const schema = Yup.object().shape({
  avatar_id: Yup.number(),
  name: Yup.string(),
  email: Yup.string().email(),
  oldPassword: Yup.string().when('password', (password, field) =>
    password ? field.required('Current password is required') : field
  ),
  password: Yup.string()
    .transform(value => (!value ? null : value))
    .nullable()
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field.required().oneOf([Yup.ref('password')], 'Password does not match')
      : field
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  // Pegar os dados do usuario atual no redux (nome, email). O initialData, pega automaticamente
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Content>
        <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
          <AvatarInput name="avatar_id" />

          <Input name="name" placeholder="Nome Completo" />
          <Input
            name="email"
            type="email"
            placeholder="Seu endereço de e-mail"
          />

          <hr />

          <Input
            type="password"
            name="oldPassword"
            placeholder="Sua senha atual"
          />
          <Input type="password" name="password" placeholder="Nova senha" />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmação de senha"
          />

          <Button>
            <button type="submit">
              <MdAddCircleOutline color="fff" size={18} margin-right={10} />
              Atualizar perfil
            </button>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
