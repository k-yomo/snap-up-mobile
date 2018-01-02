import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  FlatList,
  Text,
  View
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { fetchDeck } from '../../actions/decks';

export default class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  calculateProficiency(prevProficiency, know) {
    let newProficiency = prevProficiency;
    if (know && prevProficiency < 5) {
      newProficiency += 1;
    } else if (!know && prevProficiency > 0) {
      newProficiency -= 1;
    }
    return newProficiency === 0 ? 0 : newProficiency * 20;
  }

  calculateScore() {
    const knownCardsNum = this.calculateKnownCardsTotal();
    return knownCardsNum === 0 ? 0 : Math.round((knownCardsNum / this.props.record.score.length) * 100);
  }

  calculateKnownCardsTotal() {
    return this.props.record.score.reduce((total, result) => {
      return result.know ? total + 1 : total;
    }, 0);
  }

  componentDidMount() {
    this.props.dispatch(fetchDeck(this.props.record.deckId));
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.record.score}
          ListHeaderComponent={
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, marginLeft: 20 }}>
            <AnimatedCircularProgress
              size={150}
              width={15}
              rotation={0}
              fill={this.calculateScore()}
              prefill={0}
              tintColor="#FFC107"
              backgroundColor="#DDD"
            >
              {(fill) => (<Text style={styles.percentageNum}>{Math.round(fill)}%</Text>)}
            </AnimatedCircularProgress>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
              <Text style={styles.memorized}>Memorized</Text>
              <Text style={styles.number}>{this.calculateKnownCardsTotal().toString()}</Text>
              <Text style={styles.notYet}>Not yet</Text>
              <Text style={styles.number}>{this.props.record.score.length - this.calculateKnownCardsTotal()}</Text>
              <Text style={styles.total}>Total cards</Text>
              <Text style={styles.number}>{this.props.record.score.length}</Text>
            </View>
          </View>
          }
          renderItem={({ item }) => (
            <ListItem
              title={item.card.english}
              subtitle={item.card.meaning}
              rightIcon={item.know ?
                <Icon name='check' /> :
                <Icon name='clear' color='#F44336' />
              }

              leftIcon={
                <View style={{ marginTop: 5, marginRight: 8 }}>
                  <AnimatedCircularProgress
                    size={42}
                    width={5}
                    rotation={0}
                    fill={this.calculateProficiency(item.card.proficiency, item.know)}
                    prefill={0}
                    tintColor={item.card.proficiency >= 4 && item.know ? '#FF5722' : '#FFC107'}
                    backgroundColor="#DDD"
                  >
                    {(fill) =>
                      <View style={styles.proficiencyContainer}>
                        <Text style={styles.proficiency}>{fill === 0 ? 0 : Math.round(fill) / 20}
                        </Text>
                      </View>
                    }
                  </AnimatedCircularProgress>
                </View>
              }
              titleStyle={{ color: '#212121', fontSize: 22 }}
              subtitleContainerStyle={{ paddingTop: 3 }}
              subtitleStyle={{ color: '#757575', fontSize: 14 }}
            />
          )}
          keyExtractor={item => item.card.id}
          style={{ marginTop: 15 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width - 30,
    marginTop: 20,
    marginBottom: 50,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'white',
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  memorized: {
    fontSize: 20,
    color: '#FFC107',
    fontWeight: 'bold'
  },
  notYet: {
    fontSize: 20,
    color: '#F44336',
    fontWeight: 'bold'
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#757575',
  },
  number: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
  },
  percentageNum: {
    position: 'absolute',
    top: 58,
    left: 46,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFC107'
  },
  proficiencyContainer: {
    position: 'absolute',
    top: 13,
    left: 8,
    width: 25,
    alignItems: 'center'
  },
  proficiency: {
    color: '#757575'
  }
});
