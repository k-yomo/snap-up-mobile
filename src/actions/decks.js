import firebase from 'react-native-firebase';

export const fetchDecks = uid => dispatch => {
  const ref = firebase.firestore().collection('users').doc(uid).collection('decks');
  ref.get().then(querySnapShot => {
    const decks = [];
    querySnapShot.forEach((doc) => {
      const deck = doc.data();
      deck.id = doc.id;
      decks.push(deck);
    });
    dispatch(setDecks(decks));
  });
};

const setDecks = decks => ({
  type: 'SET_DECKS',
  decks
});

export const postDeck = (uid, title) => dispatch => {
    const ref = firebase.firestore().collection(`users/${uid}/decks`);
    ref.add({ title }).then((docRef) => dispatch(addDeck(docRef.id, title)));
};

const addDeck = (id, title) => ({
  type: 'ADD_NEW_DECK',
  deck: {
    id,
    title,
    cards: []
  }
});

export const deleteDeck = (uid, deckId) => dispatch => {
  firebase.firestore().doc(`users/${uid}/decks/${deckId}`).delete()
  .then(() => dispatch(removeDeck(deckId)));
};

const removeDeck = id => ({
  type: 'REMOVE_DECK',
  id
});
