
export default (state = [], action) => {
  switch (action.type) {
    case 'SET_CARDS':
      return action.cards;
    case 'ADD_NEW_CARD':
      return [action.card, ...state];
    default:
      return state;
  }
};
