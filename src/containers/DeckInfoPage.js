import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  View
} from 'react-native';
import headerNavConfig from '../config/navigationOptions';
import CardCreator from '../components/DeckInfo/CardCreator';
import CardListItem from '../components/DeckInfo/CardListItem';
import SortButton from '../components/DeckInfo/SortButton';
import sortCards from '../sort/cards';
import { sortByDate, sortByProficiency } from '../actions/sortBy';

class DeckInfoPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    ...headerNavConfig,
    title: navigation.state.params.deck.title,
    headerRight: (
      <SortButton
        sortBy={navigation.state.params.sortBy}
        onPress={navigation.state.params.changeSortBy}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      isSwiping: false,
      isRefreshing: false,
      isModalVisible: false,
      viewableItemIndices: []
    };
    this.onSwipe = this.onSwipe.bind(this);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    this.changeSortBy = this.changeSortBy.bind(this);
  }

  componentDidMount() {
      this.props.navigation.setParams({
        sortBy: this.props.sortBy,
        changeSortBy: this.changeSortBy
      });
    }

  onSwipe(isSwiping) {
    this.setState({ isSwiping });
  }

  onViewableItemsChanged(info) {
    let viewableItemIndices = info.viewableItems.map(item => item.index);
    const topIndex = viewableItemIndices[0];
    const extra = [1, 2, 3, 4, 5];
    const bottomIndex = viewableItemIndices[viewableItemIndices.length - 1];
      viewableItemIndices =
      [
        ...extra.map(num => topIndex - num),
        ...viewableItemIndices,
        ...extra.map(num => num + bottomIndex)
      ];
    this.setState({ viewableItemIndices });
  }

  changeSortBy() {
    if (this.props.sortBy === 'date') {
      this.props.dispatch(sortByProficiency());
      this.props.navigation.setParams({ sortBy: 'proficiency' });
    } else {
      this.props.dispatch(sortByDate());
      this.props.navigation.setParams({ sortBy: 'date' });
    }
  }

  render() {
    console.log(this.props.sortBy);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, backgroundColor: '#F9FAFC' }}>
          <CardCreator
            deckId={this.props.deck.id}
            dispatch={this.props.dispatch}
          />
          <FlatList
            scrollEnabled={!this.state.isSwiping}
            data={this.props.deck.cards}
            renderItem={({ item, index }) => {
              if (this.state.viewableItemIndices.indexOf(index) < 0) {
                  return <View style={{ height: 65 }} />;
              }
              return (
                <CardListItem
                  key={item.id}
                  card={item}
                  deckId={this.props.deck.id}
                  onSwipe={this.onSwipe}
                  dispatch={this.props.dispatch}
                  navigate={this.props.navigation.navigate}
                />
              );
            }}
            onEndReachedThreshold={100}
            onViewableItemsChanged={this.onViewableItemsChanged}
            keyExtractor={item => item.id}
            style={{ marginTop: 15 }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = ({ decks, sortBy }, props) => {
  const selectedDeck = decks.find((deck) => deck.id === props.navigation.state.params.deck.id);
  return {
    deck: { ...selectedDeck, cards: sortCards(selectedDeck.cards, sortBy) },
    sortBy
  };
};

export default connect(mapStateToProps)(DeckInfoPage);
