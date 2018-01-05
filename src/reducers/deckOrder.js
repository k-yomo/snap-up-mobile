
export default (state = [], action) => {
  switch (action.type) {
    case 'SET_DECK_ORDER':
      return action.deckOrder;
    default:
      return state;
  }
};
