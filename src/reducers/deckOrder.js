
export default (state = [], action) => {
  switch (action.type) {
    case 'SET_DECK_ORDER':
      return action.deckOrder;
    case 'ADD_NEW_DECK_TO_ORDER':
      return [action.deckId, ...state];
    default:
      return state;
  }
};
