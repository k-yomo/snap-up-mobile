import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import Spinner from 'react-native-spinkit';


export default (props) => {
  if (props.loadingGif) {
    return (
      <Spinner
         style={styles.spinner}
         isVisible
         size={50}
         type='WanderingCubes'
         color='#F44336'
      />
    );
  }
  const eng = props.english.endsWith(' ') ?
  props.english.slice(0, -1) : props.english;

  return (
    <View>
      <Icon
        name='cached'
        size={20}
        raised
        onPress={() => props.fetchGif(eng)}
        containerStyle={styles.iconContainer}
      />
      {props.gifUrl &&
        <Image
          style={styles.gif}
          source={{ uri: props.gifUrl }}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    alignSelf: 'center',
    marginTop: 73,
    marginBottom: 73
  },
  iconContainer: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    right: 0
  },
  gif: {
    width: null,
    height: 200,
    borderRadius: 5,
    marginTop: -5
  }
});
