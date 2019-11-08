import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 0 30px;
`;

export const Content = styled.div`
  max-width: 900px;
  height: 92px;

  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    width: 160px;

    a {
      font-weight: bold;
      color: #fff;
      font-size: 36px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  div.name_e_img {
    display: flex;
    align-items: center;
    text-align: right;
    padding: 16px;

    &:hover {
      background: ${darken(0.3, 'rgba(0,0,0,0.3)')};
    }
  }

  div.name_e_link {
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  div.barra {
    height: 41px;
    border-right: 1px solid #999;
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;

    padding: 3px;
    background: linear-gradient(to right, red, purple);
  }

  button {
    width: 71px;
    height: 42px;
    background: #f94d6a;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-weight: bold;
    font-size: 16px;
    transition: 0.2s;

    margin-left: 20px;

    &:hover {
      background: ${darken(0.03, '#f94d6a')};
    }
  }
`;
