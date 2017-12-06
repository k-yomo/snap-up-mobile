import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Card,
  Button,
  Avatar,
  ListItem,
  Icon
} from 'react-native-elements';
import Modal from 'react-native-modal';
import axios from 'axios';
import { TextField } from 'react-native-material-textfield';
import { createCard } from '../actions/cards';


export default class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      english: '',
      meaning: '',
      part: 'N/A',
      meanings: [],
      parts: ['N', 'V', 'Adj', 'Adv', 'N/A'],
      partsColors: ['#F44336', '#F66E3C', '#F89A43', '#FAC64A', '#888'],
      isModalVisible: false,
      noSuggestedMeanings: false,
      animationOut: 'fadeOutUp'
    };
  }

  onSubmitEnglish() {
    const english = this.state.english.toLowerCase();
    const meanings = [];
    axios.get(`https://glosbe.com/gapi/translate?from=en&dest=ja&format=json&phrase=${english}`)
    .then((response) => {
      const tuc = response.data.tuc;
      if (tuc) {
        for (let i = 0; i < 4; i++) {
          if (!(tuc[i] && tuc[i].phrase)) {
            break;
          }
          this.setState({ noSuggestedMeanings: false });
          meanings.push(tuc[i].phrase.text);
        }
      } else {
        this.setState({ noSuggestedMeanings: true });
      }
      this.setState({ meanings });
    });
  }

  onBackdropPress() {
    this.setState({ animationOut: 'fadeOutUp', isModalVisible: false });
  }

  onSubmitCard() {
    const newCard = {
      english: this.state.english,
      meaning: this.state.meaning,
      part: this.state.part
    };

    this.setState({
      animationOut: 'flipOutX',
      english: '',
      meaning: '',
      part: 'N/A',
      meanings: [],
      isModalVisible: false
    });
    this.props.dispatch(createCard(this.props.uid, this.props.deckId, newCard));
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
            <Card containerStyle={styles.formContainer}>
              <TextField
                label='English Word'
                value={this.state.english}
                autoCapitalize='none'
                focus={this.state.inputFocused}
                onChangeText={(english) => this.setState({ english })}
                onSubmitEditing={() => this.onSubmitEnglish()}
                textColor='rgba(0, 0, 0, .7)'
                tintColor='rgba(0, 0, 0, .38)'
                fontSize={20}
                labelFontSize={14}
                labelHeight={20}
                returnKeyType="next"
              />
              <View
                style={{
                width: null,
                marginTop: 5,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start' }}
              >
              {this.state.noSuggestedMeanings && <Text>There is no suggested meaning</Text>}
              {this.state.meanings.map((meaning, i) =>
                <Button
                  key={i}
                  onPress={() => this.setState({ meaning })}
                  containerViewStyle={styles.meaning}
                  title={meaning}
                  buttonStyle={{ backgroundColor: meaning === this.state.meaning ? '#F44336' : '#BDBDBD', borderRadius: 3 }}
                />
              )}
            </View>
              <TextField
                label='Meaning'
                value={this.state.meaning}
                autoCapitalize='none'
                focus={this.state.inputFocused}
                onChangeText={(meaning) => this.setState({ meaning })}
                textColor='rgba(0, 0, 0, .7)'
                tintColor='rgba(0, 0, 0, .38)'
                fontSize={20}
                labelFontSize={14}
                labelHeight={20}

              />
            <View
              style={{
              width: null,
              marginTop: 5,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center'
             }}
            >
              {this.state.parts.map((part, i) =>
                <Button
                  onPress={() => this.setState({ part })}
                  containerViewStyle={styles.meaning}
                  title={part}
                  buttonStyle={{ backgroundColor: this.state.part === part ? this.state.partsColors[i] :'#BDBDBD', borderRadius: 3 }}
                />
              )}
            </View>
            <Button
              raised
              disabled={!(this.state.english && this.state.meaning)}
              title='Save'
              onPress={() => this.onSubmitCard()}
              buttonStyle={{ backgroundColor: '#F44336', marginBottom: 10 }}
              disabledStyle={{ backgroundColor: '#BDBDBD' }}
            />
            </Card>
          </Modal>
          <Button
            raised
            onPress={() => this.setState({ isModalVisible: true })}
            title='Create a New Card'
            icon={{ name: 'add' }}
            buttonStyle={styles.button}
            containerViewStyle={{ marginTop: 15, marginBottom: 5 }}
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
    left: 0,
    right: 0,
    margin: 0
  },
  formContainer: {
    marginTop: 0,
    paddingTop: 5,
    paddingBottom: 5
  },
  meaning: {
    marginLeft: 0,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#F44336',
    height: 50
  }
});
