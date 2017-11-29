import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Snap Up</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 80,
    width: null,
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F5F5F5'
  },
  headerText: {
    fontFamily: 'Verdana',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF5252'
  }
})
