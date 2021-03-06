import React from 'react';
import { StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default (props) => (
  <TextField
    label={props.label}
    value={props.text}
    returnKeyType={props.returnKeyType ? props.returnKeyType : 'default'}
    autoCapitalize='none'
    onChangeText={(text) => props.onChangeText(text)}
    onSubmitEditing={() => props.text && props.onSubmitEditing && props.onSubmitEditing()}
    containerStyle={styles.textField}
    textColor='#212121'
    tintColor='#757575'
    fontSize={20}
    labelFontSize={14}
    labelHeight={15}
    labelPadding={-3}
    inputContainerPadding={4}
  />
);

const styles = StyleSheet.create({
  textField: {
    minWidth: '78%',
    marginLeft: 16,
    marginRight: 16
  }
});
