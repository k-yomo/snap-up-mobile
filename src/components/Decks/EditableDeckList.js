import React, { Component } from 'react';
import { connect } from 'react-redux';
import SortableListView from 'react-native-sortable-listview';
import { updateDeckOrder } from '../../actions/deckOrder';
import EditableDeckListItem from './EditableDeckListItem';

class EditableDeckList extends Component {

  generateDecksOjbect(decks) {
    const decksObj = {};
    decks.forEach(deck => {
      decksObj[deck.id] = { id: deck.id, title: deck.title };
    });
    return decksObj;
  }

  onRowMoved(e, order) {
    order.splice(e.to, 0, order.splice(e.from, 1)[0]);
    this.props.dispatch(updateDeckOrder(order));
  }

  render() {
    const decks = this.generateDecksOjbect(this.props.decks);
    const order = this.props.deckOrder;
    return (
      <SortableListView
        data={decks}
        order={order}
        onRowMoved={e => this.onRowMoved(e, order)}
        renderRow={deck =>
          <EditableDeckListItem
            deck={deck}
            dispatch={this.props.dispatch}
            backgroundColor={this.props.setColor(decks.length, order.indexOf(deck.id))}
          />
        }
      />
    );
  }
}


export default connect()(EditableDeckList);
