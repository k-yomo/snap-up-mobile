import { combineReducers } from 'redux';
import decks from './decks';
import user from './user';
import cards from './cards';
import record from './record';
import deckOrder from './deckOrder';
import sortBy from './sortBy';

export default combineReducers({
  user,
  decks,
  cards,
  record,
  deckOrder,
  sortBy,
});
