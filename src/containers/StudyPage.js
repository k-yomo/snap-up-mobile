import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { headerNavConfig } from '../config/navigationOptions';


class StudyPage extends Component {
  static navigationOptions = headerNavConfig;

  render() {
    return (
      <View><Text>StudyPage</Text></View>
    );
  }
}

export default connect()(StudyPage);
