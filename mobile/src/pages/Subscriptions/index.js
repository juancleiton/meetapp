import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation'; // Quando qualquer coisa for alterada, ele vai atualizar a pagina com o isFocused

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import CardMeetup from '~/components/CardMeetup';

import { Container, Empty, EmptyText, List } from './styles';

import api from '~/services/api';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadSubscriptions() {
    const response = await api.get('subscriptions');

    setSubscriptions(response.data);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadSubscriptions();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`meetups/${id}/subscriptions`);
      Alert.alert('Sucesso', 'Poxa que pena! Se inscreva em outro meetup!');
      loadSubscriptions();
    } catch (error) {
      const message = error.response.data.error;
      Alert.alert('Erro', message);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        {loading && <Loading />}

        {!loading &&
          (subscriptions.length ? (
            <List
              data={subscriptions}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <CardMeetup
                  data={item.meetup}
                  handleCancel={() => handleCancel(item.meetup_id)}
                />
              )}
              onRefresh={loadSubscriptions}
              refreshing={refreshing}
            />
          ) : (
            <Empty>
              <Icon name="event-busy" size={45} color="#fff" />
              <EmptyText>Você não se inscreveu em um meetup</EmptyText>
            </Empty>
          ))}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={30} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
