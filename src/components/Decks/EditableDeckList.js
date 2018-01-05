import React, { Component } from 'react';
import { connect } from 'react-redux';
import SortableListView from 'react-native-sortable-listview';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import { updateDeckOrder } from '../../actions/deckOrder';

class EditableDeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      v0: { title: 'Deck0' },
      v1: { title: 'Deck1' },
      v2: { title: 'Deck2' },
      v3: { title: 'Deck3' },
      v4: { title: 'Deck4' },
      v5: { title: 'Deck5' },
      v6: { title: 'Deck6' },
      v7: { title: 'Deck7' },
      v8: { title: 'Deck8' },
      v9: { title: 'Deck9' }
    };
  }

  generateDecksOjbect(decks) {
    const decksObj = {};
    decks.forEach(deck => {
      decksObj[deck.id] = { title: deck.title };
    });
    return decksObj;
  }

  render() {
    const decks = this.generateDecksOjbect(this.props.decks);
    const order = this.props.deckOrder;
    return (
      <SortableListView
        data={decks}
        order={order}
        onRowMoved={e => {
          order.splice(e.to, 0, order.splice(e.from, 1)[0]);
          this.props.dispatch(updateDeckOrder(order));
        }}
        renderRow={deck => <EditableDeckItem deck={deck} />}
      />
    );
  }
}

class EditableDeckItem extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{ padding: 25, backgroundColor: '#F8F8F8', borderBottomWidth: 1, borderColor: '#eee' }}
        {...this.props.sortHandlers}
      >
        <Text style={{ fontSize: 20 }}>{this.props.deck.title}</Text>
      </TouchableHighlight>
    );
  }
}

export default connect()(EditableDeckList);
