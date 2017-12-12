import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  FlatList,
  View
} from 'react-native';
import firebase from 'react-native-firebase';
import headerNavConfig from '../config/navigationOptions';
import DeckListItem from '../components/DeckListItem';
import DeckCreator from '../components/DeckCreator';
import { deckColors } from '../config/colors';

class DecksPage extends Component {
  static navigationOptions = { ...headerNavConfig, title: 'Decks' };

  constructor(props) {
    super(props);
    this.state = {
      colors: deckColors,
      deckTitle: '',
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

  setColor(total, i) {
    if (total < 5) {
      return this.state.colors[i * 4];
    } else if (total < 10) {
        return this.state.colors[i * 3];
    } else if (total < 20) {
      return this.state.colors[Math.floor(i * 1.5)];
    }
    return this.state.colors[i];
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F9FAFC' }}>
        <DeckCreator
          uid={this.state.uid}
          dispatch={this.props.dispatch}
        />
        {this.props.decks.length > 0 &&
        <FlatList
          scrollEnabled={!this.state.isSwiping}
          data={this.props.decks}
          renderItem={({ item, index }) => (
            <DeckListItem
              deck={item}
              uid={this.state.uid}
              onSwipe={this.onSwipe}
              dispatch={this.props.dispatch}
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

const mapStateToProps = (state) => ({
  decks: state.decks,
});

export default connect(mapStateToProps)(DecksPage);
