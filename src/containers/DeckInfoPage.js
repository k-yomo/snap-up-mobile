import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View
} from 'react-native';
import headerNavConfig from '../config/navigationOptions';
import CreateCard from '../components/CreateCard';

class DeckInfoPage extends Component {
  static navigationOptions = ({ navigation }) => ({ ...headerNavConfig, title: navigation.state.params.deck.title });

  render() {
    return (
      <View>
        <CreateCard
          uid={this.props.uid}
          deckId={this.props.deck.id}
          dispatch={this.props.dispatch}
        />
        {this.props.deck.cards.map(card => <Text>{card.english} {card.meaning}</Text>)}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deck: state.decks.find((deck) => deck.id === props.navigation.state.params.deck.id),
  uid: state.user.uid
});

export default connect(mapStateToProps)(DeckInfoPage);
