import React from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '~/components/Button';
import { Container, Banner, Info, Title, InfoRow, InfoText } from './styles';

export default function CardMeetup({ data, handleRegister, handleCancel }) {
  return (
    <Container>
      <Banner
        source={{
          uri: data.banner
            ? data.banner.url.replace('localhost', '192.168.1.107')
            : `https://api.adorable.io/avatars/50/${data.title}.png`,
        }}
      />

      <Info>
        <Title>{data.title}</Title>

        <InfoRow>
          <Icon name="event" size={15} color="#999" />
          <InfoText>
            {format(parseISO(data.date), "dd 'de' MMMM 'às' HH'h'mm", {
              locale: pt,
            })}
          </InfoText>
        </InfoRow>

        <InfoRow>
          <Icon name="location-on" size={15} color="#999" />
          <InfoText>{data.location}</InfoText>
        </InfoRow>

        <InfoRow>
          <Icon name="person" size={15} color="#999" />
          <InfoText>Organizador: {data.user.name}</InfoText>
        </InfoRow>

        {handleRegister && !data.past && (
          <Button onPress={handleRegister}>Realizar Inscrição</Button>
        )}

        {handleCancel && (
          <Button onPress={handleCancel}>Cancelar Inscrição</Button>
        )}
      </Info>
    </Container>
  );
}
