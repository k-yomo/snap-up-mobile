import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import {
  ListItem,
  Icon
} from 'react-native-elements';

export default class EditableDeckListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.deck.title
    };
  }
  
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={styles.listItemContainer}
        {...this.props.sortHandlers}
      >
        <View style={{ flex: 1 }}>
          <ListItem
            hideChevron
            title={this.state.title}
            titleStyle={{ color: 'white', fontSize: 20 }}
            containerStyle={[styles.listItem, { backgroundColor: this.props.backgroundColor }]}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    height: 65,
    marginLeft: 15,
    marginRight: 15,
    borderTopWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7
  },
  listItem: {
    flex: 1,
    width: '100%',
    height: 65,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
