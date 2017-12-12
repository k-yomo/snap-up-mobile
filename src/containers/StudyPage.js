import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import headerNavConfig from '../config/navigationOptions';
import SwipableCards from '../components/SwipableCards';


class StudyPage extends Component {
  static navigationOptions = {
    ...headerNavConfig,
    gesturesEnabled: false
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F9FAFC' }}>
        <SwipableCards
          containerStyle={{ flex: 1, position: 'relative' }}
          cards={this.props.deck.cards.map((card, i) => ({
            ...card,
            index: i,
            total: this.props.deck.cards.length
          }))}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deck: state.decks.find((deck) => deck.id === props.navigation.state.params.deckId)
});

export default connect(mapStateToProps)(StudyPage);
