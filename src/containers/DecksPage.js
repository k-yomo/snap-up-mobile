import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  ScrollView,
  RefreshControl
} from 'react-native';
import headerNavConfig from '../config/navigationOptions';
import DeckListItem from './DeckListItem';


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
      isSwiping: false,
      isRefreshing: false
    };
    this.onSwipe = this.onSwipe.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onSwipe(isSwiping) {
    this.setState({ isSwiping });
  }

  onRefresh() {
    this.setState({ isRefreshing: true });
    setTimeout(() => { this.setState({ isRefreshing: false }); }, 1000);
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
        scrollEnabled={!this.state.isSwiping}
      >
        {this.props.decks.length > 0 ? this.props.decks.map((deck, i) => (
          <DeckListItem
            key={deck.id}
            deck={deck}
            backgroundColor={i < 11 ? this.state.colors[i] : '#FAC64A'}
            onSwipe={this.onSwipe}
            navigate={this.props.navigation.navigate}
          />
        )) : <Text> Let's create new deck!</Text>
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: state.decks
});

export default connect(mapStateToProps)(DecksPage);
