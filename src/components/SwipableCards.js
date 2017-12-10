import React, { Component } from 'react';
import {
  Dimensions,
  NativeModules,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Card,
  Button,
  Icon
} from 'react-native-elements';
import SwipeCards from 'react-native-swipe-cards';
import { partsColorsPair } from '../config/colors';


class FlashCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partsColorsPair
    };
  }

  onDictionaryPress(term) {
    console.log('Dictionary is pressed');
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
    const { index, total, english, examples, definitions } = this.props;
    return (
      <Card containerStyle={styles.card}>
        <Text>{index + 1} / {total}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {this.partsSort(this.props.parts).map(part =>
            <Button
              key={part}
              title={part}
              disabled
              containerViewStyle={styles.rightButtonContainer}
              buttonStyle={styles.rightButton}
              disabledStyle={{ backgroundColor: this.state.partsColorsPair[part] }}
            />
          )}
          <Icon
            raised
            name='book-open-page-variant'
            type='material-community'
            onPress={() => this.onDictionaryPress(english)}
            containerStyle={styles.dictionaryIcon}
          />
        </View>
        <Text style={styles.english}>
          {english}
        </Text>
        {definitions && Object.values(definitions).map((def, i) => <Text key={i}>{def}</Text>)}
          {examples && Object.values(examples).map((ex, i) => <Text key={i}>{ex}</Text>)}
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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SwipeCards
        style={{ borderWidth: 1 }}
        cards={this.props.cards}
        stack
        renderCard={(cardData, i) => <FlashCard {...cardData} i={i} />}
        renderNoMoreCards={() => <NoMoreCards />}
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width - 20,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 80,
    marginLeft: -15,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  english: {
    fontSize: 40,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonContainer: {
    marginLeft: 0,
    marginRight: 5
  },
  rightButton: {
    padding: 1,
    paddingTop: 8,
    paddingBottom: 8,
    minWidth: 40,
    borderRadius: 3
  },
});
