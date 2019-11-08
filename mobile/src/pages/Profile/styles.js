import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  height: 42px;
  margin-top: 20px;
  background: #d44059;
`;

export const Divide = styled.View`
  border: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 30px 0 20px;
`;
