import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import configureStore from './store/configureStore';
import firebaseConfig from './config/firebaseConfig';
import Header from './components/Header';
import Router from './routes';
import LoginPage from './containers/LoginPage';

const store = configureStore();


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    };
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loaded: true });
      if (user) {
        console.log(user);
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header />
          { this.state.loaded ? <Router /> : <LoginPage /> }
        </View>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
