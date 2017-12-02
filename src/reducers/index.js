import { combineReducers } from 'redux';
import decks from './decks';
import user from './user';

export default combineReducers({
  decks,
  user,
});
