import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Subscriptions from '~/pages/Subscriptions';
import Profile from '~/pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Subscriptions,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#22202c',
                height: 64,
              },
              tabStyle: {
                paddingTop: 5,
                paddingBottom: 5,
              },
            },
          }
        ),
      },
      {
        // Se o isSigned passado por parametro, for true(logado) vai para 'App',
        // se for false (nao logado) vai para 'Sign'
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
