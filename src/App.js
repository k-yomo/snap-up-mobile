import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import firebase from 'react-native-firebase';
import Header from './components/Header';
import Router from './routes';
import UserAuth from './containers/UserAuth';
import { setUser } from './actions/user';
import { fetchDecks } from './actions/decks';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
        this.props.dispatch(setUser(user.uid));
        this.props.dispatch(fetchDecks(user.uid));
      }
    });
  }

  render() {
    if (!this.state.loggedIn) {
     return <UserAuth />;
    }
    return (
        <View style={styles.container}>
          <Header />
          <Router />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect()(App);
