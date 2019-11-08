import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 50px;
  background: #e5556e;
  border-radius: 4px;

  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
