import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(#22202c, #402845);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  img {
    width: 41px;
    height: 42px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    input {
      height: 50px;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      padding: 0 15px;
      margin: 0 0 10px;
      color: #fff;
    }

    input:last-of-type {
      margin: 0 0 15px;
    }

    button {
      height: 50px;
      background: #f94d6a;
      border: 0;
      border-radius: 4px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      transition: 0.2s;

      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
