import React, { Component } from 'react';
import { View } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import FlashCard from './FlashCard';
import NoMoreCards from './NoMoreCards';
import { updateRecord } from '../actions/record';

export default class SwipableCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewableCardsIndices: [0, 1, 2]
    };
    this.handleYup = this.handleYup.bind(this);
    this.handleNope = this.handleNope.bind(this);
    this.cardRemoved = this.cardRemoved.bind(this);
  }

  handleYup(card) {
    this.props.dispatch(updateRecord({ card, know: true }));
  }

  handleNope(card) {
    this.props.dispatch(updateRecord({ card, know: false }));
  }

  cardRemoved() {
    const indices = this.state.viewableCardsIndices;
    this.setState({
      viewableCardsIndices: [...indices.slice(1), indices[indices.length - 1] + 1]
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SwipeCards
          cards={this.props.cards.filter((card, i) => this.state.viewableCardsIndices.includes(i))}
          stack
          renderCard={(cardData, i) => <FlashCard key={i} i={i} {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards record={this.props.record} cards={this.props.cards } />}
          smoothTransition
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          cardRemoved={this.cardRemoved}
          onClickHandler={() => console.log('Clicked')}
        />
      </View>
    );
  }
}
