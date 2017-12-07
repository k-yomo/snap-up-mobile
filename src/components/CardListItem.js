import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableHighlight
} from 'react-native';
import {
  Avatar,
  ListItem,
  Button,
  Icon
} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import { deleteCard } from '../actions/cards';


export default class DeckListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftItemOpacity: 0.4,
      listItemOpacity: 1.0,
      partsColors: {
        N: '#F44336',
        V: '#3F51B5',
        Adj: '#F89A43',
        Adv: '#009688',
        'N/A': '#888'
      },
      isDeleting: false
    };
    this.animatedValue = new Animated.Value(0);
    this.animate = this.animate.bind(this);
    this.onRightActionRelease = this.onRightActionRelease.bind(this);
    this.onLeftActionRelease = this.onLeftActionRelease.bind(this);
  }

  onRightActionRelease() {
    this.setState({ isDeleting: true });
    this.animate();
    setTimeout(() => {
      this.deleteCard();
    }, 400);

  }

  deleteCard() {
    this.props.dispatch(deleteCard(this.props.uid, this.props.deckId, this.props.card.id));
  }

  onLeftActionRelease() {
    console.log('Left action released!');
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.cubic
      }
    ).start((o) => {
      if (!o.finished) {
        this.animate();
      }
    });
  }

  partsSort(obj) {
    const orderedArr = ['N', 'V', 'Adj', 'Adv', 'N/A'];
    return Object.keys(obj).sort((a, b) => orderedArr.indexOf(a) - orderedArr.indexOf(b));
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
    const { card, onSwipe, backgroundColor } = this.props;

    return (
      <Animated.View
        style={{
          marginLeft: this.state.isDeleting ? marginLeft : 0,
          marginRight: this.state.isDeleting ? marginRight : 0
        }}
      >
        <Swipeable
          key={card.id}
          swipeStartMinDistance={2}
          leftContent={leftContent}
          leftActionActivationDistance={90}
          onLeftActionActivate={() => this.setState({ leftItemOpacity: 1.0 })}
          onLeftActionDeactivate={() => this.setState({ leftItemOpacity: 0.4 })}
          onLeftActionRelease={this.onLeftActionRelease}
          rightContent={rightContent}
          rightActionActivationDistance={120}
          onRightActionActivate={() => this.setState({ listItemOpacity: 0.4 })}
          onRightActionDeactivate={() => this.setState({ listItemOpacity: 1.0 })}
          onRightActionRelease={this.onRightActionRelease}
          onSwipeStart={() => onSwipe(true)}
          onSwipeRelease={() => onSwipe(false)}
          style={styles.listItemContainer}
        >
          <TouchableHighlight
            onPress={() => console.log('Card is pressed!')}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1 }}>
              <ListItem
                title={card.english}
                subtitle={card.meaning}
                rightIcon={<View style={styles.rightAreaContainer}>
                  {this.partsSort(card.parts).map(part =>
                    <Button
                      key={part}
                      title={part}
                      disabled
                      containerViewStyle={styles.rightButtonContainer}
                      buttonStyle={styles.rightButton}
                      disabledStyle={{ backgroundColor: this.state.partsColors[part] }}
                    />)}

                </View>}
                titleStyle={{ color: 'rgba(0, 0, 0, .7)', fontSize: 22 }}
                subtitleContainerStyle={{ paddingTop: 3 }}
                subtitleStyle={{ color: 'rgba(0, 0, 0, .35)', fontSize: 14 }}
                containerStyle={
                  StyleSheet.flatten([
                    styles.listItem,
                    { opacity: this.state.listItemOpacity }
                  ])
                }
                roundAvatar
                avatar={
                  <Avatar
                    medium
                    rounded
                    title={card.frequency.toString()}
                    titleStyle={{ fontSize: 20 }}
                  />
                }
              />
            </View>
          </TouchableHighlight>
        </Swipeable>
      </Animated.View>
   );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    height: 65,
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
    height: 65,
    borderBottomWidth: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightAreaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  rightButtonContainer: {
    marginLeft: 8,
    marginRight: 0
  },
  rightButton: {
    padding: 3,
    paddingTop: 8,
    paddingBottom: 8,
    minWidth: 38,
    borderRadius: 3,
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
