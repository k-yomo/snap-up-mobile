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
      leftItemOpacity: 0.4,
      listItemOpacity: 1.0,
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
        <View style={
          StyleSheet.flatten([
            styles.leftSwipeItem,
            {
              opacity: this.state.leftItemOpacity
            }
          ])}
        >
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
        leftActionActivationDistance={90}
        onLeftActionActivate={() => this.setState({ leftItemOpacity: 1.0 })}
        onLeftActionDeactivate={() => this.setState({ leftItemOpacity: 0.4 })}
        onLeftActionRelease={() => console.log("Left Release")}
        rightContent={rightContent}
        rightActionActivationDistance={120}
        onRightActionActivate={() => this.setState({ listItemOpacity: 0.4 })}
        onRightActionDeactivate={() => this.setState({ listItemOpacity: 1.0 })}
        onRightActionRelease={this.onRightActionRelease}
        onSwipeStart={() => this.props.onSwipe(true)}
        onSwipeRelease={() => this.props.onSwipe(false)}
        style={styles.listItemContainer}
      >
        <ListItem
          hideChevron
          title={this.props.deck.title}
          titleStyle={{ color: 'white', fontSize: 22 }}
          containerStyle={
            StyleSheet.flatten([
              styles.listItem,
              {
                backgroundColor: this.props.backgroundColor,
                opacity: this.state.listItemOpacity
              }
            ])
          }
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
    backgroundColor: 'white',
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItem: {
    flex:1,
    width: null,
    height: 85,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  rightSwipeItem: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

});

export default connect()(DeckListItem);
