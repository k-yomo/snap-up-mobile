import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'react-native-firebase';
import configureStore from './store/configureStore';
import Header from './components/Header';
import Router from './routes';
import UserAuth from './containers/UserAuth';

const store = configureStore();


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }

  componentWillMount() {
    firebase.auth().signOut();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      }
    });
  }

  render() {
    if (!this.state.loggedIn) {
     return (
       <Provider store={store}>
         <UserAuth />
       </Provider>
     );
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header />
          <Router />
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
