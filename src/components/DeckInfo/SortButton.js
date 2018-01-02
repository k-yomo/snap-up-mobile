import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { Button } from 'react-native-elements';

export default (props) => (
  <Button
    buttonStyle={styles.buttonStyle}
    textStyle={styles.textStyle}
    title={props.sortBy === 'date' ? 'New' : 'Weak'}
    onPress={props.onPress}
  />
);

const styles = StyleSheet.create({
  buttonStyle: {
    width: 62,
    paddingTop: 8,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 3,
    backgroundColor: null,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(244, 67, 54, 1.0)'
  },
  textStyle: {
    color: 'rgba(244, 67, 54, 1.0)'
  }
});
