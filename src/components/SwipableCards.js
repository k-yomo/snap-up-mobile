import React, { Component } from 'react';
import {
  Dimensions,
  NativeModules,
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
import SwipeCards from 'react-native-swipe-cards';
import FlipCard from 'react-native-flip-card'
import { partsColorsPair } from '../config/colors';


class FlashCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partsColorsPair,
      gifUrl: '',
    };
  }
  onDictionaryPress(term) {
    NativeModules.ReferenceLibraryManager.showDefinitionForTerm(term, (hasDefinition) => {
      if (!hasDefinition) {
        this.setState({ noDefinition: true });
      }
    });
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
          <Icon
            raised
            name='book-open-page-variant'
            type='material-community'
            onPress={() => this.onDictionaryPress(english)}
            containerStyle={styles.dictionaryIcon}
          />
          <Icon
            raised
            name='volume-up'
            onPress={() => this.onDictionaryPress(english)}
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
              style={{ flex: 1, borderWidth: 0, justifyContent: 'center' }}
            >
              <View style={{ flex: 1, borderWidth: 1, borderColor: 'rgba(38, 50, 56, 0.5)' }}>
                <Text style={[styles.meaning, { opacity: 0 }]}>{meaning}</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.meaning}>{meaning}</Text>
              </View>
            </FlipCard>
          </View>
        </View>
        <View style={{ flex: 1, width: null }}>
          <Text style={{ color: '#FFC107', fontSize: 20, fontWeight: 'bold' }}>Examples</Text>
          {examples && Object.values(examples).map((ex, i) =>
            <Text
              key={i}
              style={styles.example}
            >
              {i + 1}. {ex}
            </Text>
          )}
        </View>
        <Text style={styles.pageNumber}>{index + 1} / {total}</Text>
      </Card>
    );
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    );
  }
}

export default class SwipableCards extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SwipeCards
          cards={this.props.cards}
          stack
          renderCard={(cardData, i) => <FlashCard key={i} i={i} {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          smoothTransition
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    minHeight: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width - 30,
    marginTop: 20,
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
    color: 'rgba(38, 50, 56, 0.7)'

  },
  english: {
    marginBottom: 5,
    fontSize: 40,
    color: 'rgb(38, 50, 56)'
  },
  meaning: {
    fontSize: 25,
    color: 'rgba(38, 50, 56, 0.7)'
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    color: 'rgba(38, 50, 56, 0.7)'
  }
});
