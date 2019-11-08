import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo2x.png';
import Background from '~/components/Background';

import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignedLinkText,
} from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading); // useSelector serve para acessar o state do reducer

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next" // O botao do teclado fica escrito "Next"
            onSubmitEditing={() => passwordRef.current.focus()} // Depois que editar vai focar no email, ref={passwordRef}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry // Deixar os pontinhos da senha
            placeholder="Sua senha secreta"
            ref={passwordRef} // Serve como referencia
            returnKeyType="send" // O botao do teclado fica escrito "Send"
            onSubmitEditing={handleSubmit} // Vai chamar a funcao para logar
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.navigate('SignUp'); // Para mudar de pagina
          }}
        >
          <SignedLinkText>Criar conta grátis</SignedLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
