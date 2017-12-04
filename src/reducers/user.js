
export default (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { uid: action.uid };
    default:
      return state;
  }
};
