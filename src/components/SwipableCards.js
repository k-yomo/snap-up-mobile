import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import FlashCard from './FlashCard';


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
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
