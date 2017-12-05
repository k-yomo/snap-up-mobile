import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { TextField } from 'react-native-material-textfield';
import { createDeck } from '../actions/decks';


export default class CreateDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckTitle: '',
      isModalVisible: false,
      inputFocused: false,
      animationOut: 'fadeOutUp'
    };
  }

  onBackdropPress() {
    this.setState({ deckTitle: '', animationOut: 'fadeOutUp', isModalVisible: false });
  }

  onSubmitDeck() {
    if (this.state.deckTitle) {
      this.props.dispatch(createDeck(this.props.uid, this.state.deckTitle));
      this.setState({ deckTitle: '', animationOut: 'fadeOutDown', isModalVisible: false });
    }
  }

  render() {
    return (
      <View>
        <Modal
          animationIn='fadeInDown'
          animationOut={this.state.animationOut}
          animationOutTiming={400}
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.onBackdropPress()}
          style={styles.modal}
        >
          <View style={styles.formContainer}>
            <TextField
              label='Deck Title'
              value={this.state.deckTitle}
              autoCapitalize='none'
              focus={this.state.inputFocused}
              onChangeText={(deckTitle) => this.setState({ deckTitle })}
              onSubmitEditing={() => this.onSubmitDeck()}
              textColor='white'
              tintColor='rgba(0, 0, 0, .38)'
              fontSize={20}
              labelFontSize={16}
            />
          </View>
        </Modal>
        <Button
          raised
          onPress={() => this.setState({ isModalVisible: true, inputFocused: true })}
          title='Create New Deck'
          icon={{ name: 'library-add' }}
          buttonStyle={styles.button}
          containerViewStyle={{ margin: 15 }}
          textStyle={{ fontSize: 20 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 70,
    height: 75,
    left: 0,
    right: 0,
    margin: 0,
    backgroundColor: '#F44336'
  },
  formContainer: {
    paddingLeft: 20,
    paddingBottom: 7
  },
  button: {
    backgroundColor: '#F44336',
    height: 50
  }
});
