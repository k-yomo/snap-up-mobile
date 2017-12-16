
export default (state = {}, action) => {
  switch (action.type) {
    case 'START_RECORD':
      return { deckId: action.deckId, score: [] };
    case 'ADD_RECORD':
      return { deckId: state.deckId, score: [action.score, ...state.score] };
    case 'RESET_RECORD':
      return {};
    default:
      return state;
  }
};
