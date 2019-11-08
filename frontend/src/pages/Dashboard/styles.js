import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;

    h1 {
      color: #fff;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;

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
  }
`;

export const MeetupList = styled.div`
  .empty {
    display: flex;
    align-self: center;
    justify-content: center;

    font-size: 20px;
    color: #fff;

    margin-top: 50px;
  }
`;

export const Meetup = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-radius: 4px;
  margin-top: 10px;
  padding: 20px;

  background: rgba(0, 0, 0, 0.1);

  > p {
    font-size: 18px;
    color: #fff;
    font-weight: bold;
  }

  aside {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      color: #999;
    }
  }
`;
