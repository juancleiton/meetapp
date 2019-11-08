import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Para buscar uma informacao no redux
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo.svg';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile); // Para pegar as informacoes do redux

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="Meetapp" />
            eetapp
          </Link>
        </nav>

        <aside>
          <Profile>
            <div className="name_e_img">
              <div className="name_e_link">
                <strong>{profile.name}</strong>
                <Link to="/profile">Meu Perfil</Link>
              </div>

              <img
                src={
                  profile.avatar
                    ? profile.avatar.url
                    : 'https://api.adorable.io/avatars/50/abott@adorable.png'
                }
                alt={profile.name}
              />
            </div>

            <div className="barra"></div>

            <button type="button" onClick={handleSignOut}>
              Sair
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
