import React, { Component } from 'react';
import {
  Dimensions,
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
import FlipCard from 'react-native-flip-card';
import Tts from 'react-native-tts';
import DictionaryIcon from './DictionaryIcon';
import { partsColorsPair } from '../config/colors';

export default class FlashCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partsColorsPair,
      gifUrl: '',
    };
  }

  partsSort(obj) {
    const orderedArr = ['N', 'V', 'Adj', 'Adv', 'N/A'];
    return Object.keys(obj).sort((a, b) => orderedArr.indexOf(a) - orderedArr.indexOf(b));
  }

  render() {
    const { index, total, gifUrl, english, meaning, examples } = this.props;
    return (
      <Card containerStyle={styles.card}>
        {gifUrl ?
          <Image
          style={{
            width: Dimensions.get('screen').width - 30,
            height: 200,
            borderRadius: 5,
            marginLeft: -15
           }}
          source={{ uri: gifUrl }}
          /> : null
        }
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <DictionaryIcon
            english={english}
            containerStyle={styles.dictionaryIcon}
          />
          <Icon
            raised
            size={20}
            name='volume-up'
            onPress={() => Tts.speak(english)}
            containerStyle={styles.dictionaryIcon}
          />
        </View>
        <View style={{ alignSelf: 'center', marginBottom: 10 }}>
          <Text style={styles.english}>
            {english}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start' }}>
            {this.partsSort(this.props.parts).map(part =>
              <Button
                key={part}
                title={part}
                disabled
                containerViewStyle={styles.partsOfSpeechContainer}
                buttonStyle={styles.partOfSpeech}
                disabledStyle={{ backgroundColor: this.state.partsColorsPair[part] }}
              />
            )}
            <FlipCard
              flip={false}
              style={{ flex: 1, borderWidth: 0, justifyContent: 'center' }}
            >
              <View style={{ flex: 1, borderWidth: 1, borderColor: '#CDCDCD' }}>
                <Text style={[styles.meaning, { opacity: 0 }]}>{meaning}</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.meaning}>{meaning}</Text>
              </View>
            </FlipCard>
          </View>
        </View>
        {examples &&
          <View style={{ flex: 1, width: null }}>
            <Text style={{ color: '#EF5350', fontSize: 20, fontWeight: 'bold' }}>Examples</Text>
            {Object.values(examples).map((ex, i) =>
              <Text
                key={i}
                style={styles.example}
              >
                {i + 1}. {ex}
              </Text>
            )}
          </View>
        }
        <Text style={styles.pageNumber}>{index + 1} / {total}</Text>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    minHeight: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width - 30,
    marginTop: 50,
    marginLeft: -10,
    paddingTop: 0,
    borderWidth: null,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    backgroundColor: 'rgba(255,255,255, 0.98)',
    justifyContent: 'center',
  },
  pageNumber: {
    position: 'absolute',
    left: -10,
    top: 213,
    alignSelf: 'center',
    margin: 8,
    fontSize: 20,
    color: '#757575'

  },
  english: {
    marginBottom: 5,
    fontSize: 40,
    color: '#212121'
  },
  meaning: {
    fontSize: 25,
    color: '#757575'
  },
  partsOfSpeechContainer: {
    marginLeft: 0,
    marginRight: 5
  },
  partOfSpeech: {
    padding: 1,
    paddingTop: 8,
    paddingBottom: 8,
    minWidth: 40,
    borderRadius: 3
  },
  dictionaryIcon: {
    margin: 0,
    marginTop: 5,
    marginLeft: 10
  },
  example: {
    marginTop: 5,
    fontSize: 18,
    color: '#757575'
  }
});
