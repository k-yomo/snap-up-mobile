import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View
} from 'react-native';
import firebase from 'react-native-firebase';
import headerNavConfig from '../config/navigationOptions';
import CreateCard from '../components/CreateCard';
import CardListItem from '../components/CardListItem';

class DeckInfoPage extends Component {
  static navigationOptions = ({ navigation }) => ({ ...headerNavConfig, title: navigation.state.params.deck.title });

  constructor(props) {
    super(props);
    this.state = {
      isSwiping: false,
      isRefreshing: false,
      isModalVisible: false,
      uid: firebase.auth().currentUser.uid
    };
    this.onSwipe = this.onSwipe.bind(this);
  }

  onSwipe(isSwiping) {
    this.setState({ isSwiping });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CreateCard
          uid={this.state.uid}
          deckId={this.props.deck.id}
          dispatch={this.props.dispatch}
        />
        <ScrollView
          scrollEnabled={!this.state.isSwiping}
          style={{ marginTop: 15 }}
        >
          {this.props.deck.cards && this.props.deck.cards.map((card) => (
            <CardListItem
              key={card.id}
              card={card}
              deckId={this.props.deck.id}
              uid={this.state.uid}
              onSwipe={this.onSwipe}
              dispatch={this.props.dispatch}
              navigate={this.props.navigation.navigate}
            />
          ))}
      </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deck: state.decks.find((deck) => deck.id === props.navigation.state.params.deck.id)
});

export default connect(mapStateToProps)(DeckInfoPage);
