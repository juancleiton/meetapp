import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes'; // É a condicao que esta no arquivo 'routes.js'

export default function App() {
  const signed = useSelector(state => state.auth.signed); // Vai buscar no state se o usuario esta logado ou nao

  const Routes = createRouter(signed); // A condicao com signed, se for true(logado) vai para 'App', se for false (nao logado) vai para 'Sign'. Parametro la do 'routes.js' isSigned

  return <Routes />; // Ai aqui vai mudar de pagina
}
