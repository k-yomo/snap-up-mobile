import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  FlatList,
  View
} from 'react-native';
import headerNavConfig from '../config/navigationOptions';
import DeckListItem from '../components/Decks/DeckListItem';
import DeckCreator from '../components/Decks/DeckCreator';
import { deckColors } from '../config/colors';
import sortDecks from '../sort/decks';

class DecksPage extends Component {
  static navigationOptions = { ...headerNavConfig, title: 'Decks' };

  constructor(props) {
    super(props);
    this.state = {
      isSwiping: false,
      isRefreshing: false,
      isModalVisible: false
    };
    this.onSwipe = this.onSwipe.bind(this);
  }

  onSwipe(isSwiping) {
    this.setState({ isSwiping });
  }

  setColor(total, i) {
    if (total < 5) {
      return deckColors[i * 4];
    } else if (total < 10) {
        return deckColors[i * 3];
    } else if (total < 20) {
      return deckColors[Math.floor(i * 1.5)];
    }
    return deckColors[i];
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F9FAFC' }}>
        <DeckCreator
          dispatch={this.props.dispatch}
        />
        {this.props.decks.length > 0 &&
        <FlatList
          scrollEnabled={!this.state.isSwiping}
          data={this.props.decks}
          renderItem={({ item, index }) => (
            <DeckListItem
              deck={item}
              onSwipe={this.onSwipe}
              dispatch={this.props.dispatch}
              sortBy={this.props.sortBy}
              navigate={this.props.navigation.navigate}
              backgroundColor={this.setColor(this.props.decks.length, index)}
            />
          )}
          keyExtractor={item => item.id}
        />
      }
    </View>
    );
  }
}

const mapStateToProps = ({ decks, sortBy }) => ({
  decks: sortDecks(decks),
  sortBy
});

export default connect(mapStateToProps)(DecksPage);
