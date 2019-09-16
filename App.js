/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format1edbb9e08bb8
 * @flow
 */

import React, {Component} from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
// import Login from './screens/Login';
import LoginNew from './screens/LoginNew';
import Home from './screens/Home';
import Chat from './screens/Chat';
import SignUp from './screens/Signup';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

// import firebase from 'firebase';

const AppStack = createStackNavigator({Home: Home, Chat: Chat});
const AuthStack = createStackNavigator({Signup: SignUp, Login: LoginNew});
const AuthLoadingStack = createStackNavigator({AuthLoading: AuthLoadingScreen});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingStack,
      Auth: AuthStack,
      Main: AppStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
