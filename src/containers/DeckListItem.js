import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Vibration
} from 'react-native';
import {
  Avatar,
  Card,
  ListItem,
  Icon
} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import { deleteDeck } from '../actions/decks';

class DeckListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlerting: false
    };
    this.onRightActionRelease = this.onRightActionRelease.bind(this);
  }

  onDeleteDeckPress(deckId) {
    this.props.dispatch(deleteDeck(deckId));
  }

  onRightActionRelease() {
    if (!this.state.isAlerting) {
      this.setState({ isAlerting: true });
      Alert.alert(
        'Delete this Deck',
        `Are you sure you want to delete ${this.props.deck.title}?`,
        [
          { text: 'OK',
            onPress: () => {
              this.onDeleteDeckPress(this.props.deck.id);
              Vibration.vibrate(100);
            }
          },
          { text: 'Cancel' }
        ]
      )
    }
    this.setState({ isAlerting: false });
  }

  render() {
    const leftContent = (
        <View style={styles.leftSwipeItem}>
          <Text style={{ fontSize: 22, color: '#F44336', fontWeight: 'bold'}}>Start</Text>
        </View>
    )
    const rightContent = (
        <View style={styles.rightSwipeItem}>
          <Icon size={40} name="delete-forever" color='#757575' />
        </View>
    )

    return (
      <Swipeable
        key={this.props.deck.id}
        swipeStartMinDistance={2}
        leftContent={leftContent}
        rightContent={rightContent}
        leftActionActivationDistance={100}
        rightActionActivationDistance={120}
        onLeftActionRelease={() => console.log("Left Release")}
        onRightActionRelease={this.onRightActionRelease}
        onSwipeStart={() => this.props.onSwipe(true)}
        onSwipeRelease={() => this.props.onSwipe(false)}
        style={
          StyleSheet.flatten(
            [styles.listItemContainer, { backgroundColor: this.props.color }]
          )
        }
      >
        <ListItem
          hideChevron
          title={this.props.deck.title}
          titleStyle={{ color: 'white', fontSize: 22 }}
          containerStyle={{ borderBottomWidth: 0 }}
          roundAvatar
          avatar={
            <Avatar
              medium
              rounded
              title="MT"
            />
          }
        />
     </Swipeable>
   );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    height: 85,
    borderTopWidth: 0,
    shadowColor: '#eee',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItem: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    paddingRight: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    backgroundColor: 'white'
  },

});

export default connect()(DeckListItem);
