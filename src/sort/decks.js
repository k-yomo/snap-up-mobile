
export default (decks, deckOrder) => decks.sort((a, b) => (
  deckOrder.indexOf(a.id) > deckOrder.indexOf(b.id) ? 1 : -1
));
