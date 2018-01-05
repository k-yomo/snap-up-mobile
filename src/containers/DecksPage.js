import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  View
} from 'react-native';
import headerNavConfig from '../config/navigationOptions';
import DeckListItem from '../components/Decks/DeckListItem';
import DeckCreator from '../components/Decks/DeckCreator';
import EditableDeckList from '../components/Decks/EditableDeckList';
import HeaderRightButton from '../components/HeaderRightButton';
import { deckColors } from '../config/colors';
import sortDecks from '../sort/decks';


class DecksPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    ...headerNavConfig,
    title: 'Decks',
    headerRight: (
      <HeaderRightButton
        title={navigation.state.params && navigation.state.params.isEditing ? 'Done' : 'Edit'}
        onPress={() => navigation.state.params &&
          navigation.setParams({ isEditing: !navigation.state.params.isEditing })
        }
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      isSwiping: false,
      isRefreshing: false,
      isModalVisible: false
    };
    this.onSwipe = this.onSwipe.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      isEditing: false
    });
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
    const { params = {} } = this.props.navigation.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#F9FAFC' }}>
        <DeckCreator
          dispatch={this.props.dispatch}
        />
        {params.isEditing ?
          <EditableDeckList
            decks={this.props.decks}
            deckOrder={this.props.deckOrder}
          /> :
          this.props.decks.length > 0 &&
          <FlatList
            scrollEnabled={!this.state.isSwiping}
            data={sortDecks(this.props.decks, this.props.deckOrder)}
            renderItem={({ item, index }) => (
              <DeckListItem
                deck={item}
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

const mapStateToProps = ({ decks, deckOrder }) => ({
  decks,
  deckOrder
});

export default connect(mapStateToProps)(DecksPage);
