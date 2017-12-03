import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import firebase from 'react-native-firebase';
import { Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import Spinner from 'react-native-spinkit';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  onButtonPress(email, password) {
    this.setState({ loading: true, error: '' });
    if (this.props.haveAccount) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((er) => {
        const error = this.props.haveAccount ?
        'Email and/or password are invalid. Please try again.' : er.message;
        this.setState({
          error,
          loading: false
        });
      });
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((er) => {
        const error = this.props.haveAccount ?
        'Email and/or password are invalid. Please try again.' : er.message;
        this.setState({
          error,
          loading: false
        });
      });
    }
  }

  password() {
    let pw = '';
      for (let i = 0; i < this.state.password.length; i++) {
        pw += '*';
      }
      return pw;
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
         style={styles.spinner}
         isVisible={this.state.loading}
         size={50}
         type='WanderingCubes'
         color='white'
        />
        <Text style={styles.error}>{this.state.error}</Text>
        <TextField
          label='Email adoress'
          value={this.state.email}
          autoCapitalize='none'
          onChangeText={(email) => this.setState({ email })}
          textColor='white'
          tintColor='rgba(0, 0, 0, .38)'
          fontSize={20}
          labelFontSize={16}
        />
        <TextField
          label='Password'
          value={this.password()}
          autoCapitalize='none'
          onChangeText={(password) => this.setState({ password })}
          textColor='white'
          tintColor='rgba(0, 0, 0, .38)'
          fontSize={20}
          labelFontSize={16}
        />
        <Button
          disabled={!(this.state.email && this.state.password)}
          onPress={() => this.onButtonPress(this.state.email, this.state.password)}
          buttonStyle={styles.submitButton}
          disabledStyle={{ backgroundColor: null, opacity: 0.5 }}
          textStyle={{ fontWeight: 'bold', fontSize: 24 }}
          title={this.props.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginLeft: 50,
    marginRight: 50
  },
  spinner: {
    alignSelf: 'center',
    marginBottom: 20
  },
  submitButton: {
    backgroundColor: null,
    borderBottomWidth: 2,
    borderColor: 'white',
    borderRadius: 3,
    marginTop: 7
  },
  error: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, .70)'
  }
});

export default connect()(AuthForm);
