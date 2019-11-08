import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

// Aqui vai pegando todas as propriedades da pagina
export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
