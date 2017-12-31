
export default (state = 'proficiency', action) => {
  switch (action.type) {
    case 'SORT_BY_DATE':
      return 'date';
    case 'SORT_BY_PROFICIENCY':
      return 'proficiency';
    default:
      return state;
  }
};
