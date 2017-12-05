
const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_DECKS':
      return action.decks;
    case 'ADD_NEW_DECK':
      return [action.deck, ...state];
    case 'REMOVE_DECK':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_CARDS':
      return state.map((deck) => {
        if (deck.id === action.id) {
          const deckCopy = Object.assign({}, deck);
          deckCopy.cards = action.cards;
          return deckCopy;
        }
        return deck;
      });
    case 'ADD_NEW_CARD':
      return state.map((deck) => {
        if (deck.id === action.deckId) {
          const deckCopy = Object.assign({}, deck);
          deckCopy.cards = [action.card, ...deck.cards];
          return deckCopy;
        }
        return deck;
      });
    default:
      return state;
  }
};
