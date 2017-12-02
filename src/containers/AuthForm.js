import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextField
          label='Email adoress'
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          textColor='white'
        />
        <TextField
          label='Password'
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          textColor='white'
        />
        <Button
          disabled={!(this.state.email && this.state.password)}
          buttonStyle={styles.submitButton}
          textStyle={{ fontWeight: 'bold', fontSize: 24 }}
          disabledStyle={{ backgroundColor: null, opacity: 0.5 }}
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
  submitButton: {
    backgroundColor: null,
    borderBottomWidth: 2,
    borderColor: 'white',
    borderRadius: 3,
    marginTop: 7
  }
});

export default connect()(AuthForm);
