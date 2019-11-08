import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 0 30px;

  .loading {
    margin: 50px auto;
    display: flex;
    justify-content: center;
  }
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 50px auto 0;

  header {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      color: #fff;
    }

    nav {
      display: flex;
    }

    button {
      border: 0;
      border-radius: 4px;
      padding: 8px 12px;

      display: flex;
      align-items: center;

      color: #fff;
      font-size: 14px;
      font-weight: bold;

      + button {
        margin-left: 10px;
      }

      &.edit {
        background: #4dbaf9;

        &:hover {
          background: ${darken(0.03, '#4dbaf9')};
        }
      }

      &.cancel {
        background: #d44059;

        &:hover {
          background: ${darken(0.03, '#d44059')};
        }
      }
    }

    svg {
      margin-right: 5px;
    }

    .banner {
      width: 100%;
      position: absolute;
    }
  }

  main {
    margin-top: 50px;

    .banner {
      overflow: hidden;
      height: 0;
      width: 100%;
      padding-top: 37.778%;
      position: relative;

      img {
        display: block;
        max-width: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }

    .description {
      color: #fff;
      margin-top: 20px;
    }

    .info {
      color: #999;
      display: flex;

      p {
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-right: 30px;
      }

      svg {
        margin-right: 5px;
      }
    }
  }
`;
