import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { headerNavConfig } from '../config/navigationOptions';

class DecksPage extends Component {
  static navigationOptions = headerNavConfig;

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <Text>DecksPage</Text>
      </View>
    );
  }
}

export default connect()(DecksPage);
