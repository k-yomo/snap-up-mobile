import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import headerNavConfig from '../config/navigationOptions';


class DeckInfoPage extends Component {
  static navigationOptions = headerNavConfig;

  render() {
    return (
      <View>
        <Text>DeckInfoPage</Text>
      </View>
    );
  }
}

export default connect()(DeckInfoPage);
