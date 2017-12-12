import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import {
  Card,
  Button,
  Icon
} from 'react-native-elements';
import axios from 'axios';
import Spinner from 'react-native-spinkit';
import { TextField } from 'react-native-material-textfield';
import { createCard } from '../actions/cards';
import DictionaryIcon from './DictionaryIcon';
import { X_MASHAPE_KEY } from '../../env';

export default class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      english: '',
      meaning: '',
      gifUrl: '',
      wordInfo: {
        parts: []
      },
      suggestedMeanings: [],
      partConverter: {
        noun: 'N',
        verb: 'V',
        adjective: 'Adj',
        adverb: 'Adv',
        unapprecable: 'N/A'
      },
      parts: ['N', 'V', 'Adj', 'Adv', 'N/A'],
      partsColors: ['#EF5350', '#3F51B5', '#F89A43', '#009688', '#888'],
      noSuggestedMeaning: false,
      noDefinition: false,
      isEnglishEntered: false,
      loadingGif: false
    };
  }

  onSubmitEnglish() {
    this.setState({ isEnglishEntered: true, noDefinition: false });

    let english = this.state.english.toLowerCase();
    english = english.endsWith(' ') ? english.slice(0, -1) : english;
    this.fetchMeanings(english);
    this.fetchWordInfo(english);
    this.fetchGif(english);
  }

  onBackdropPress() {
    this.setState({
      english: '',
      meaning: '',
      gifUrl: '',
      wordInfo: {
        parts: []
      },
      suggestedMeanings: [],
      isEnglishEntered: false,
      noSuggestedMeaning: false,
      noDefinition: false
    });
  }

  onSubmitCard() {
    const wordInfo = this.state.wordInfo;
    wordInfo.examples = wordInfo.examples ? this.convertArrayToObj(wordInfo.examples) : null;
    if (wordInfo.parts.length > 0) {
      wordInfo.parts = this.convertArrayBoolObj(wordInfo.parts);
    } else {
      wordInfo.parts = { 'N/A': true };
    }

    const newCard = {
      english: this.state.english,
      meaning: this.state.meaning,
      gifUrl: this.state.gifUrl,
      ...wordInfo
    };

    this.setState({
      english: '',
      meaning: '',
      gifUrl: '',
      wordInfo: {
        parts: []
      },
      suggestedMeanings: [],
      isEnglishEntered: false,
      noSuggestedMeaning: false,
      noDefinition: false,
    });
    this.props.dispatch(createCard(this.props.uid, this.props.deckId, newCard));
  }

  onCancelCreateCard() {
    this.setState({
      english: '',
      meaning: '',
      gifUrl: '',
      wordInfo: {
        parts: []
      },
      suggestedMeanings: [],
      isEnglishEntered: false,
      noSuggestedMeaning: false,
      noDefinition: false
    });
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

  noDefFound() {
    this.setState({ noDefinition: true });
  }

  fetchMeanings(english) {
    const suggestedMeanings = [];
    axios.get(`https://glosbe.com/gapi/translate?from=en&dest=ja&format=json&phrase=${english}`)
    .then((response) => {
      const tuc = response.data.tuc;
      if (tuc.length) {
        for (let i = 0; i < 4; i++) {
          if (!(tuc[i] && tuc[i].phrase)) { break; }
          this.setState({ noSuggestedMeaning: false });
          suggestedMeanings.push(tuc[i].phrase.text);
        }
      } else {
        this.setState({ noSuggestedMeaning: true });
      }
      this.setState({ suggestedMeanings });
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
      const slicedResults = response.data.results.slice(0, 2);

      slicedResults.forEach(result =>
      !wordInfo.parts.includes(this.state.partConverter[result.partOfSpeech]) &&
      wordInfo.parts.push(this.state.partConverter[result.partOfSpeech]));

      slicedResults.forEach(result => result.examples && examples.push(result.examples));
      wordInfo.examples = [].concat.apply([], examples);

      this.setState({ wordInfo });
    });
  }

  fetchGif(english) {
    this.setState({ loadingGif: true });
    axios.get(`https://api.giphy.com/v1/gifs/translate?api_key=0YlwqVMmfk1MgyH4gzG9W4EWi3meWomG&s=${english}`)
    .then(response => {
      if (response.data.data.images.fixed_height_downsampled.url) {
        this.setState({
          gifUrl: response.data.data.images.fixed_height_downsampled.url,
          loadingGif: false
         });
      }
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

  renderGif() {
    if (this.state.loadingGif) {
      return (
        <Spinner
           style={styles.spinner}
           isVisible
           size={50}
           type='WanderingCubes'
           color='#F44336'
        />
      );
    }
    const eng = this.state.english.endsWith(' ') ?
    this.state.english.slice(0, -1) : this.state.english;

    return (
      <View>
        <Icon
          name='cached'
          size={20}
          raised
          onPress={() => {
            this.fetchGif(eng);
          }}
          containerStyle={{
            zIndex: 10,
            position: 'absolute',
            top: 0,
            right: 0
          }}
        />
        {this.state.gifUrl &&
          <Image
            style={{
              width: null,
              height: 200,
              borderRadius: 5,
              marginTop: -5
             }}
            source={{ uri: this.state.gifUrl }}
          />
        }
      </View>
    );
  }

  render() {
    const {
      english,
      meaning,
      suggestedMeanings,
      wordInfo,
      isEnglishEntered,
      partsColors
    } = this.state;
    return (
      <Card containerStyle={styles.Container}>
        { isEnglishEntered && this.renderGif() }
        {this.state.noDefinition &&
          <Text style={styles.warning}>
            definition not found or dictionary is not installed
          </Text>
        }
        <View style={styles.englishInputContainer}>
          <TextField
            label='New English Word'
            value={english}
            keyboardType='default'
            returnKeyType="search"
            autoCapitalize='none'
            focus={this.state.inputFocused}
            onChangeText={(eng) => this.setState({ english: eng })}
            onSubmitEditing={() => english && this.onSubmitEnglish()}
            containerStyle={styles.textField}
            textColor='rgb(38, 50, 56)'
            tintColor='rgba(38, 50, 56, 0.7)'
            fontSize={20}
            labelFontSize={14}
            labelHeight={20}
          />
          { isEnglishEntered &&
            <DictionaryIcon
              size={20}
              onPress={this.onDictionaryPress}
              english={this.state.english}
              containerStyle={styles.containerStyle}
              noDefFound={this.noDefFound.bind(this)}
            />
          }
        </View>
        { isEnglishEntered &&
          <View>
            <View
              style={styles.suggestedMeaningContainer}
            >
              {this.state.noSuggestedMeaning &&
                <Text style={styles.warning}>
                  There is no suggested meaning
                </Text>
              }
              {suggestedMeanings.map((suggestedM, i) =>
                <Button
                  key={i}
                  onPress={() => this.setState({ meaning: suggestedM })}
                  containerViewStyle={styles.smallButtonContainer}
                  title={suggestedM}
                  buttonStyle={{
                    backgroundColor: suggestedM === meaning ? '#F44336' : '#BDBDBD',
                    borderRadius: 3
                  }}
                />
              )}
            </View>
              <TextField
                label='The Meaning'
                value={meaning}
                keyboardType='default'
                returnKeyType="done"
                autoCapitalize='none'
                focus={this.state.inputFocused}
                onChangeText={(m) => this.setState({ meaning: m })}
                containerStyle={styles.textField}
                textColor='rgb(38, 50, 56)'
                tintColor='rgba(38, 50, 56, 0.7)'
                fontSize={20}
                labelFontSize={14}
                labelHeight={20}

              />
            <View
              style={styles.partOfSpeechContainer}
            >
              {this.state.parts.map((part, i) =>
                <Button
                  key={i}
                  onPress={() => this.onPartOfSpeechPress(part)}
                  containerViewStyle={styles.smallButtonContainer}
                  title={part}
                  buttonStyle={
                    StyleSheet.flatten([
                      styles.posButton,
                      {
                        backgroundColor: wordInfo.parts && wordInfo.parts.includes(part) ?
                        partsColors[i] : '#BDBDBD'
                      }
                    ])
                  }
                />
              )}
            </View>
            <View style={styles.submitButtonsContainer}>
              <Button
                raised
                title='Cancel'
                onPress={() => this.onCancelCreateCard()}
                containerViewStyle={{ margin: 0 }}
                buttonStyle={styles.cancelButton}
              />
              <Button
                raised
                disabled={!(english && meaning)}
                title='Save'
                onPress={() => this.onSubmitCard()}
                containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
                buttonStyle={styles.saveButton}
                disabledStyle={{ backgroundColor: '#BDBDBD' }}
              />
            </View>
          </View>
        }
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    paddingTop: 5,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0
  },
  englishInputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textField: {
    minWidth: '68%',
    marginLeft: 16,
    marginRight: 16
  },
  dictionaryIcon: {
    marginLeft: 0,
    marginRight: 30
  },
  suggestedMeaningContainer: {
    marginLeft: 8,
    marginBottom: -5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  smallButtonContainer: {
    marginLeft: 8,
    marginRight: 4,
    marginBottom: 8,
  },
  partOfSpeechContainer: {
    marginTop: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  posButton: {
    borderRadius: 3,
    padding: '1%',
    paddingTop: 10,
    paddingBottom: 10,
    minWidth: '15.85%'
  },
  warning: {
    color: '#F44336'
  },
  submitButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15
  },
  cancelButton: {
    margin: 0,
    paddingLeft: '10%',
    paddingRight: '10%',
    backgroundColor: 'rgba(0, 0, 0, .38)',
  },
  saveButton: {
    paddingLeft: '20%',
    paddingRight: '20%',
    backgroundColor: '#F44336',
    margin: 0
  },
  spinner: {
    alignSelf: 'center',
    marginTop: 73,
    marginBottom: 73
  },
});
