import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground
} from 'react-native';
import firebase from 'react-native-firebase';
import AuthForm from './AuthForm';

const img = require('../images/background.png');

class UserAuth extends Component {
  constructor(props) {
    super(props);
    this.state = { haveAccount: true };
  }

  render() {
    return (
      <ImageBackground
       source={img}
       style={styles.container}
      >
        {this.state.haveAccount ? (
          <View style={styles.formContainer}>
            <AuthForm title='Login' />
            <Text style={styles.description}>
              Don't have account?
            </Text>
            <Text
              style={styles.changeAuth}
              onPress={() => this.setState({ haveAccount: false })}
            >
              Sign up
            </Text>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <AuthForm title='Sign up' />
            <Text style={styles.description}>
              Already have an account?
            </Text>
            <Text
              style={styles.changeAuth}
              onPress={() => this.setState({ haveAccount: true })}
            >
              Login
            </Text>
          </View>
        )}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  formContainer: {
    flex: 1,
    marginBottom: 80,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    paddingTop: 30,
    fontSize: 16,
    opacity: 0.8,
    color: '#5D4037'
  },
  changeAuth: {
    paddingTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default connect()(UserAuth);
