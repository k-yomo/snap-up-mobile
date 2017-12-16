import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        {this.props.record.score.map((result) => <Text key={result.cardId}>{result.cardId}: {result.know ? '◯' : '×'}</Text>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
