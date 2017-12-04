
const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_DECKS':
      return action.decks;
    case 'ADD_NEW_DECK':
      return [action.deck, ...state];
    case 'REMOVE_DECK':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};
