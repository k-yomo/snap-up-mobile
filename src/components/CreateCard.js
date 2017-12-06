import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Card,
  Button
} from 'react-native-elements';
import Modal from 'react-native-modal';
import axios from 'axios';
import { TextField } from 'react-native-material-textfield';
import { createCard } from '../actions/cards';
import { X_MASHAPE_KEY } from '../../env';


export default class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      english: '',
      meaning: '',
      wordInfo: {
        parts: []
      },
      meanings: [],
      partConverter: {
        noun: 'N',
        verb: 'V',
        adjective: 'Adj',
        adverb: 'Adv',
        unapprecable: 'N/A'
      },
      parts: ['N', 'V', 'Adj', 'Adv', 'N/A'],
      partsColors: ['#F44336', '#F66E3C', '#F89A43', '#FAC64A', '#888'],
      isModalVisible: false,
      noSuggestedMeaning: false,
      animationOut: 'fadeOutUp'
    };
  }

  onSubmitEnglish() {
    const english = this.state.english.toLowerCase();
    this.fetchMeanings(english);
    this.fetchWordInfo(english);
  }

  onBackdropPress() {
    this.setState({
      animationOut: 'fadeOutUp',
      english: '',
      meaning: '',
      wordInfo: {
        parts: []
      },
      meanings: [],
      isModalVisible: false
    });
  }

  onSubmitCard() {
    const wordInfoCopy = this.state.wordInfo;
    wordInfoCopy.definitions = this.convertArrayToObj(wordInfoCopy.definitions);
    wordInfoCopy.examples = this.convertArrayToObj(wordInfoCopy.examples);
    if (wordInfoCopy.parts.length) {
      wordInfoCopy.parts = this.convertArrayBoolObj(wordInfoCopy.parts);
    } else {
      wordInfoCopy.parts = { 'N/A': true };
    }

    const newCard = {
      english: this.state.english,
      meaning: this.state.meaning,
      ...wordInfoCopy
    };

    this.setState({
      animationOut: 'flipOutX',
      english: '',
      meaning: '',
      wordInfo: {
        parts: []
      },
      meanings: [],
      isModalVisible: false
    });
    this.props.dispatch(createCard(this.props.uid, this.props.deckId, newCard));
  }

  onPartOfSpeechPress(pressedPart) {
    let wordInfo = Object.assign(this.state.wordInfo);
    if (wordInfo.parts.includes(pressedPart)) {
      wordInfo = {
        ...wordInfo,
        parts: wordInfo.parts.filter(part => part !== pressedPart)
      };
    } else {
      wordInfo.parts.push(pressedPart);
    }
    this.setState({ wordInfo });
  }


  fetchMeanings(english) {
    const meanings = [];
    axios.get(`https://glosbe.com/gapi/translate?from=en&dest=ja&format=json&phrase=${english}`)
    .then((response) => {
      const tuc = response.data.tuc;
      if (tuc.length) {
        for (let i = 0; i < 4; i++) {
          if (!(tuc[i] && tuc[i].phrase)) { break; }
          this.setState({ noSuggestedMeaning: false });
          meanings.push(tuc[i].phrase.text);
        }
      } else {
        this.setState({ noSuggestedMeaning: true });
      }
      this.setState({ meanings });
    });
  }

  fetchWordInfo(english) {
    axios.get(`https://wordsapiv1.p.mashape.com/words/${english}`,
    { headers: { 'X-Mashape-Key': X_MASHAPE_KEY } })
    .then(response => {
      const wordInfo = {
        parts: []
      };
      const examples = [];
      const slicedResults = response.data.results.slice(0, 3);
      console.log(response.data.frequency);

      wordInfo.frequency = response.data.frequency;
      wordInfo.definitions = slicedResults.map(result => result.definition);

      slicedResults.forEach(result =>
      !wordInfo.parts.includes(this.state.partConverter[result.partOfSpeech]) &&
      wordInfo.parts.push(this.state.partConverter[result.partOfSpeech]));

      slicedResults.forEach(result => result.examples && examples.push(result.examples));
      wordInfo.examples = [].concat.apply([], examples);

      this.setState({ wordInfo });
    });
  }

  convertArrayToObj(arr) {
    return arr.reduce((result, el, index) => {
      result[index] = el;
      return result;
    }, {});
  }

  convertArrayBoolObj(arr) {
    return arr.reduce((result, el) => {
      result[el] = true;
      return result;
    }, {});
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
                keyboardType='email-address'
                returnKeyType="search"
                value={this.state.english}
                autoCapitalize='none'
                focus={this.state.inputFocused}
                onChangeText={(english) => this.setState({ english })}
                onSubmitEditing={() => this.state.english && this.onSubmitEnglish()}
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
                justifyContent: 'flex-start' }}
              >
              {this.state.noSuggestedMeaning &&
                <Text style={styles.noSuggestedMeaning}>
                  There is no suggested meaning
                </Text>
              }
              {this.state.meanings.map((meaning, i) =>
                <Button
                  key={i}
                  onPress={() => this.setState({ meaning })}
                  containerViewStyle={styles.meaning}
                  title={meaning}
                  buttonStyle={{
                    backgroundColor: meaning === this.state.meaning ? '#F44336' : '#BDBDBD',
                    borderRadius: 3
                  }}
                />
              )}
            </View>
              <TextField
                label='Meaning'
                keyboardType='default'
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
              style={styles.partOfSpeech}
            >
              {this.state.parts.map((part, i) =>
                <Button
                  key={i}
                  onPress={() => this.onPartOfSpeechPress(part)}
                  containerViewStyle={styles.meaning}
                  title={part}
                  buttonStyle={{
                    backgroundColor: this.state.wordInfo.parts && this.state.wordInfo.parts.includes(part) ? this.state.partsColors[i] : '#BDBDBD',
                    borderRadius: 3
                  }}
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
            title='New Card'
            icon={{ name: 'note-add', size: 22 }}
            buttonStyle={styles.createCardButton}
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
    right: 0,
    left: 0,
    margin: 0
  },
  formContainer: {
    marginTop: 0,
    paddingTop: 5,
    paddingBottom: 5
  },
  meaning: {
    marginBottom: 10,
    marginLeft: 0
  },
  createCardButton: {
    height: 50,
    backgroundColor: '#F44336'
  },
  partOfSpeech: {
  width: null,
  marginTop: 5,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center'
},
noSuggestedMeaning: {
  color: '#F44336'
}
});
