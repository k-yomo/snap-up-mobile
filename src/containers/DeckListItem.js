import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Vibration,
  Animated,
  Easing
} from 'react-native';
import {
  Avatar,
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
    this.animatedValue = new Animated.Value(0);
    this.animate = this.animate.bind(this);
    this.onRightActionRelease = this.onRightActionRelease.bind(this);
    this.onLeftActionRelease = this.onLeftActionRelease.bind(this);
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
              Vibration.vibrate(50);
              this.animate();
              setTimeout(() => { this.deleteDeck(); }, 500);
            }
          },
          { text: 'Cancel' }
        ]
      );
    }
    this.setState({ isAlerting: false });
  }

  onLeftActionRelease(id) {
    this.props.navigate('Study', { id });
  }

  deleteDeck() {
    this.props.dispatch(deleteDeck(this.props.uid, this.props.deck.id));
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.cubic
      }
    ).start((o) => {
      if (!o.finished) {
        this.animate();
      }
    });
  }


  render() {
    const leftContent = (
        <View
          style={
          StyleSheet.flatten([
            styles.leftSwipeItem,
            {
              opacity: this.state.leftItemOpacity
            }
          ])}
        >
          <Text style={{ fontSize: 20, color: '#F44336', fontWeight: 'bold' }}>Start</Text>
        </View>
    );
    const rightContent = (
      <View style={styles.rightSwipeItem}>
        <Icon size={35} name="delete-forever" color='#757575' />
      </View>
    );
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -700]
    });
    const marginRight = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 700]
    });
    const marginBottom = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -75]
    });
    const { deck, onSwipe, backgroundColor } = this.props;

    return (
      <Animated.View
        style={{
          marginLeft,
          marginRight,
          marginBottom
        }}
      >
        <Swipeable
          key={deck.id}
          swipeStartMinDistance={2}
          leftContent={leftContent}
          leftActionActivationDistance={90}
          onLeftActionActivate={() => this.setState({ leftItemOpacity: 1.0 })}
          onLeftActionDeactivate={() => this.setState({ leftItemOpacity: 0.4 })}
          onLeftActionRelease={() => this.onLeftActionRelease(deck.id)}
          rightContent={rightContent}
          rightActionActivationDistance={120}
          onRightActionActivate={() => this.setState({ listItemOpacity: 0.4 })}
          onRightActionDeactivate={() => this.setState({ listItemOpacity: 1.0 })}
          onRightActionRelease={this.onRightActionRelease}
          onSwipeStart={() => onSwipe(true)}
          onSwipeRelease={() => onSwipe(false)}
          style={styles.listItemContainer}
        >
          <ListItem
            hideChevron
            title={deck.title}
            titleStyle={{ color: 'white', fontSize: 20 }}
            containerStyle={
              StyleSheet.flatten([
                styles.listItem,
                { backgroundColor, opacity: this.state.listItemOpacity }
              ])
            }
            roundAvatar
            avatar={
              <Avatar
                medium
                rounded
                title="MT"
                titleStyle={{ fontSize: 20 }}
              />
            }
          />
        </Swipeable>
      </Animated.View>
   );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    height: 75,
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
    flex: 1,
    width: null,
    height: 75,
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
