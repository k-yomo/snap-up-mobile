import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  View
} from 'react-native';
import headerNavConfig from '../config/navigationOptions';
import CardCreator from '../components/CardCreator';
import CardListItem from '../components/CardListItem';

class DeckInfoPage extends Component {
  static navigationOptions = ({ navigation }) => ({ ...headerNavConfig, title: navigation.state.params.deck.title });

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

  render() {
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
            }

            }
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

const mapStateToProps = (state, props) => ({
  deck: state.decks.find((deck) => deck.id === props.navigation.state.params.deck.id)
});

export default connect(mapStateToProps)(DeckInfoPage);
