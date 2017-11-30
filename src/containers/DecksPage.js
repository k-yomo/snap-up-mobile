import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import { headerNavConfig } from '../config/navigationOptions';
import DeckListItem from './DeckListItem';

class DecksPage extends Component {
  static navigationOptions = headerNavConfig;

  constructor(props) {
    super(props);
    this.state = {
      colors: [
        '#EA3C35',
        '#ED3E35',
        '#F04035',
        '#F44336',
        '#F6513F',
        '#F85F48',
        '#FA6D52',
        '#FB7C61',
        '#FD8B70',
        '#FF9A80'
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
    this.setState({isRefreshing: true});
    setTimeout(() => { this.setState({isRefreshing: false}) }, 1000);
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
            backgroundColor={ i < 11 ? this.state.colors[i] : '#FF9A80'}
            onSwipe={this.onSwipe}
          />
        )) : <Text> Let's create new deck!</Text>
      }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    backgroundColor: 'white'
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },

});

const mapStateToProps = (state) => ({
  decks: state.decks
});

export default connect(mapStateToProps)(DecksPage);
