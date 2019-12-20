import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 30px;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 50px auto 0;

  form {
    display: flex;
    flex-direction: column;

    input,
    textarea {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 50px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      resize: none;
      height: 200px;
      padding: 15px;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 10px 0 0;
    width: 162px;
    height: 42px;
    background: #f94d6a;
    border: 0;
    border-radius: 4px;

    color: #fff;
    font-size: 16px;
    font-weight: bold;

    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#f94d6a')};
    }

    svg {
      margin-right: 5px;
    }
  }
`;
