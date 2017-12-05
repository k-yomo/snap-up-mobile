import { combineReducers } from 'redux';
import decks from './decks';
import user from './user';
import cards from './cards';

export default combineReducers({
  user,
  decks,
  cards,
});
