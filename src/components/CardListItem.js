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
  ListItem,
  Button,
  Icon
} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import Tts from 'react-native-tts';
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
    this.onDeleteCardPress = this.onDeleteCardPress.bind(this);
    this.onLeftActionRelease = this.onLeftActionRelease.bind(this);
  }

  onDeleteCardPress() {
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
    Tts.speak('Hello, world!');
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
    const rightButton = [
      <TouchableHighlight onPress={this.onDeleteCardPress}>
        <View style={styles.rightSwipeItem}>
          <Icon
            size={35}
            name="delete-forever"
            color='#757575'
            containerStyle={{ marginLeft: -3 }}
          />
        </View>
      </TouchableHighlight>
    ];
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -700]
    });
    const marginRight = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 700]
    });
    const { card, onSwipe } = this.props;
    return (
      <Animated.View
        style={{
          marginLeft: this.state.isDeleting ? marginLeft : 15,
          marginRight: this.state.isDeleting ? marginRight : 15
        }}
      >
        <Swipeable
          key={card.id}
          swipeStartMinDistance={2}
          rightButtons={rightButton}
          rightButtonWidth={60}
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
                  <Button
                    icon={{ name: 'volume-up', color: '#888' }}
                    raised
                    containerViewStyle={styles.voiceButtonContainer}
                    buttonStyle={
                      StyleSheet.flatten([
                        styles.rightButton,
                        { minWidth: 41, backgroundColor: null, marginRight: -5 }
                      ])
                    }
                    onPress={() => Tts.speak(card.english)}
                  />
                </View>}
                titleStyle={{ marginLeft: 7, color: 'rgba(0, 0, 0, .7)', fontSize: 22 }}
                subtitleContainerStyle={{ paddingTop: 3 }}
                subtitleStyle={{ marginLeft: 7, color: 'rgba(0, 0, 0, .35)', fontSize: 14 }}
                containerStyle={
                  StyleSheet.flatten([
                    styles.listItem,
                    { opacity: this.state.listItemOpacity }
                  ])
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
    marginLeft: 0,
    borderBottomWidth: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightAreaContainer: {
    maxWidth: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rightButtonContainer: {
    marginLeft: 0,
    marginRight: 5
  },
  voiceButtonContainer: {
    marginLeft: 0,
    marginRight: 0
  },
  rightButton: {
    padding: 1,
    paddingTop: 8,
    paddingBottom: 8,
    minWidth: 35,
    borderRadius: 3
  },
  rightSwipeItem: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: '#E9E8EE',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
