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
      uid: firebase.auth().currentUser.uid
    };
    this.onSwipe = this.onSwipe.bind(this);
  }

  onSwipe(isSwiping) {
    this.setState({ isSwiping });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
        <FlatList
          scrollEnabled={!this.state.isSwiping}
          data={this.props.deck.cards}
          ListHeaderComponent={() => (
            <CardCreator
              uid={this.state.uid}
              deckId={this.props.deck.id}
              dispatch={this.props.dispatch}
            />
          )}
          renderItem={({ item }) => (
            <CardListItem
              key={item.id}
              card={item}
              deckId={this.props.deck.id}
              uid={this.state.uid}
              onSwipe={this.onSwipe}
              dispatch={this.props.dispatch}
              navigate={this.props.navigation.navigate}
            />
          )}
          keyExtractor={item => item.id}
          style={{ marginTop: 15 }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deck: state.decks.find((deck) => deck.id === props.navigation.state.params.deck.id)
});

export default connect(mapStateToProps)(DeckInfoPage);
