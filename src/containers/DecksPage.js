import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  RefreshControl,
  ScrollView,
  View
} from 'react-native';
import firebase from 'react-native-firebase';
import headerNavConfig from '../config/navigationOptions';
import DeckListItem from './DeckListItem';
import AddDeck from './AddDeck';
import { fetchDecks } from '../actions/decks';

class DecksPage extends Component {
  static navigationOptions = headerNavConfig;

  constructor(props) {
    super(props);
    this.state = {
      colors: [
        '#F44336',
        '#F45138',
        '#F5603A',
        '#F66E3C',
        '#F67D3E',
        '#F78B41',
        '#F89A43',
        '#F8A845',
        '#F9B747',
        '#FAC64A',
      ],
      deckTitle: '',
      isSwiping: false,
      isRefreshing: false,
      isModalVisible: false,
      uid: firebase.auth().currentUser.uid
    };
    this.onSwipe = this.onSwipe.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onSwipe(isSwiping) {
    this.setState({ isSwiping });
  }

  onRefresh() {
    this.setState({ isRefreshing: true });
    fetchDecks(this.state.uid);
    this.setState({ isRefreshing: false });
  }

  render() {
    return (
      <View>
        {console.log(this.props.decks)}
        <AddDeck uid={this.state.uid} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
            />
          }
          scrollEnabled={!this.state.isSwiping}
        >
          {this.props.decks.length > 0 && this.props.decks.map((deck, i) => (
            <DeckListItem
              key={deck.id}
              deck={deck}
              uid={this.state.uid}
              onSwipe={this.onSwipe}
              navigate={this.props.navigation.navigate}
              backgroundColor={i < 11 ? this.state.colors[i] : '#FAC64A'}
            />
          ))}
      </ScrollView>
    </View>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: state.decks,
  user: state.user
});

export default connect(mapStateToProps)(DecksPage);
