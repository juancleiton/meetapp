import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import CardMeetup from '~/components/CardMeetup';

import {
  Container,
  DateSelect,
  DateButton,
  DateText,
  Empty,
  EmptyText,
  List,
} from './styles';

import api from '~/services/api';

function Dashboard({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState();
  const [refreshing, setRefreshing] = useState(false);

  async function loadMeetups(selectedPage = 1) {
    const response = await api.get('meetups', {
      params: { date, page: selectedPage },
    });

    setMeetups(
      selectedPage > 1 ? [...meetups, ...response.data] : response.data
    );
    setPage(selectedPage);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadMeetups();
    }
  }, [isFocused, date]);

  function handleDecrementDate() {
    if (date < new Date()) return;
    setDate(subDays(date, 1));
  }

  function handleIncrementDate() {
    setDate(addDays(date, 1));
  }

  async function handleRegister(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);
      Alert.alert('Sucesso', 'Você se inscreveu neste meetup');
      loadMeetups();
    } catch (error) {
      Alert.alert('Error', 'Você já esta inscrito neste meetup');
      loadMeetups();
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateSelect>
          <DateButton onPress={handleDecrementDate}>
            <Icon name="chevron-left" size={25} color="#fff" />
          </DateButton>
          <DateText>{format(date, 'dd/MM/Y')}</DateText>
          <DateButton onPress={handleIncrementDate}>
            <Icon name="chevron-right" size={25} color="#fff" />
          </DateButton>
        </DateSelect>

        {loading && <Loading />}

        {!loading &&
          (meetups.length ? (
            <List
              data={meetups}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <CardMeetup
                  data={item}
                  handleRegister={() => handleRegister(item.id)}
                />
              )}
              onRefresh={loadMeetups}
              refreshing={refreshing}
              onEndReached={() => loadMeetups(page + 1)}
              onEndReachedThreshold={0.2}
            />
          ) : (
            <Empty>
              <Icon name="event-busy" size={45} color="#fff" />
              <EmptyText>Não existe meetups nesta data</EmptyText>
            </Empty>
          ))}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={30} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
