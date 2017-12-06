import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Vibration,
  Animated,
  Easing,
  TouchableHighlight
} from 'react-native';
import {
  Avatar,
  ListItem,
  Icon
} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';


export default class DeckListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftItemOpacity: 0.4,
      listItemOpacity: 1.0
    };
    this.animatedValue = new Animated.Value(0);
    this.animate = this.animate.bind(this);
    this.onRightActionRelease = this.onRightActionRelease.bind(this);
    this.onLeftActionRelease = this.onLeftActionRelease.bind(this);
  }

  onRightActionRelease(cardId) {
    // this.props.dispatch(deleteCard(this.props.uid, this.props.card.id, cardId));
  console.log('Right action released!');
  }

  onLeftActionRelease(id) {
    console.log('Left action released!');
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
    const { card, onSwipe, backgroundColor } = this.props;

    return (
      <Animated.View
        style={{
          marginLeft,
          marginRight,
          marginBottom
        }}
      >
        <Swipeable
          key={card.id}
          swipeStartMinDistance={2}
          leftContent={leftContent}
          leftActionActivationDistance={90}
          onLeftActionActivate={() => this.setState({ leftItemOpacity: 1.0 })}
          onLeftActionDeactivate={() => this.setState({ leftItemOpacity: 0.4 })}
          onLeftActionRelease={() => this.onLeftActionRelease(card.id)}
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
            onPress={() => this.props.navigate('DeckInfo', { card })}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1 }}>
              <ListItem
                hideChevron
                title={card.english}
                subtitle={card.meaning}
                titleStyle={{ color: 'rgba(0, 0, 0, .65)', fontSize: 22 }}
                subtitleContainerStyle={{ paddingTop: 3 }}
                subtitleStyle={{ color: 'rgba(0, 0, 0, .40)', fontSize: 14 }}
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
                    title="N"
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
