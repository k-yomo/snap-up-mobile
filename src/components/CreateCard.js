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
import axios from 'axios';
import { TextField } from 'react-native-material-textfield';
import { createCard } from '../actions/cards';


export default class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      english: '',
      meaning: '',
      isModalOpen: true,
      meanings: [],
      noSuggestedMeanings: false
    };
  }

  onSubmitEnglish() {
    const english = this.state.english.toLowerCase();
    const meanings = [];
    axios.get(`https://glosbe.com/gapi/translate?from=en&dest=ja&format=json&phrase=${english}`)
    .then((response) => {
      const tuc = response.data.tuc;
      if (tuc) {
        for (let i = 0; i < 5; i++) {
          if (!tuc[i]) {
            this.setState({ noSuggestedMeanings: true });
            break;
          }
          this.setState({ noSuggestedMeanings: false });
          meanings.push(tuc[i].phrase.text);
        }
      }
      this.setState({ meanings });
    });
  }

  onSubmitCard() {
    const newCard = { english: this.state.english, meaning: this.state.meaning };
    this.props.dispatch(createCard(this.props.uid, this.props.deckId, newCard));
    this.setState({
      english: '',
      meaning: '',
      meanings: []
    });
  }

  render() {
    return (
      <View>
          <Button
            title={this.state.isModalOpen ? 'Close' : 'Add New Card'}
            buttonStyle={{ backgroundColor: '#F44336', paddingTop: 5, paddingBottom: 5 , marginTop: 15 }}
            onPress={() => this.setState((state) => ({ isModalOpen: !state.isModalOpen }))}
            textStyle={{ fontWeight: 'bold'}}
          />
          {this.state.isModalOpen &&
            <Card containerStyle={{ marginTop: 0, paddingTop: 5, paddingBottom: 5 }}>
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
                justifyContent: 'flex-start' }}
              >
              {this.state.noSuggestedMeanings && <Text>There is no suggested meaning</Text>}
              {this.state.meanings.map((meaning, i) =>
                <Button
                  key={i}
                  onPress={() => this.setState({ meaning })}
                  containerViewStyle={{ marginLeft: 0, marginBottom: 10 }}
                  title={meaning}
                  buttonStyle={{ backgroundColor: meaning === this.state.meaning ? '#F44336' : '#bbb', borderRadius: 3 }}
                />
              )}
            </View>
            <Button
              raised
              disabled={!(this.state.english && this.state.meaning)}
              title='Save'
              onPress={() => this.onSubmitCard()}
              buttonStyle={{ backgroundColor: '#F44336', marginBottom: 10 }}
            />
            </Card>
          }
      </View>
    );
  }
}
