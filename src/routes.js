import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import DecksPage from './containers/DecksPage';

const Routes = StackNavigator(

  {
    Home: {screen: DecksPage}
  }
)

export default Routes;
