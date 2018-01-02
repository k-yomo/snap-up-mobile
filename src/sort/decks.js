
export default (decks) => decks.sort((a, b) => (
  a.index < b.index ? 1 : -1
));
