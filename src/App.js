import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Header from './components/Header';
import Routes from './routes';
const store = configureStore();

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header />
          <Routes />
        </View>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 0
  }
})
