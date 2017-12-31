
export default (cards, sortBy) => cards.sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    return a.proficiency > b.proficiency ? 1 : -1;
  });
