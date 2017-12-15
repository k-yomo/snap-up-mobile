import React, { Component } from 'react';
import { View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import FlashCard from './FlashCard';
import NoMoreCards from './NoMoreCards';

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
          onClickHandler={() => console.log('Clicked')}
        />
      </View>
    );
  }
}
