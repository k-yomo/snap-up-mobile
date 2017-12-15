import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  View
} from 'react-native';
import firebase from 'react-native-firebase';
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
      <View style={{ flex: 1, backgroundColor: '#F9FAFC' }}>
        <FlatList
          scrollEnabled={!this.state.isSwiping}
          data={this.props.deck.cards}
          ListHeaderComponent={() => (
            <CardCreator
              uid={this.props.uid}
              deckId={this.props.deck.id}
              dispatch={this.props.dispatch}
            />
          )}
          renderItem={({ item, index }) => {
            if (this.state.viewableItemIndices.indexOf(index) < 0) {
                return <View style={{ height: 65 }}/>;
            }
            return (
              <CardListItem
                key={item.id}
                card={item}
                deckId={this.props.deck.id}
                uid={this.props.uid}
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
    );
  }
}

const mapStateToProps = (state, props) => ({
  deck: state.decks.find((deck) => deck.id === props.navigation.state.params.deck.id),
  uid: state.user.uid
});

export default connect(mapStateToProps)(DeckInfoPage);
