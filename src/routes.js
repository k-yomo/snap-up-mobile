import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import DecksPage from './containers/DecksPage';
import StudyPage from './containers/StudyPage';

const Routes = StackNavigator(

  {
    Home: { screen: DecksPage },
    Study: { screen: StudyPage }
  }
)

export default Routes;
