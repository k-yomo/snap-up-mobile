import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Router from './routes';
import UserAuth from './components/UserAuth';
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
    return !this.state.loggedIn ? <UserAuth /> : <Router />;
  }
}

export default connect()(App);
