import styled from 'styled-components';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 15px;
  overflow: hidden;
`;

export const Banner = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 140px;
  align-content: stretch;
`;

export const Info = styled.View`
  padding: 20px;
`;
export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const InfoText = styled.Text`
  font-size: 14px;
  color: #888;
  margin-left: 6px;
`;
